import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { INTENT_TEMPLATES, DEFAULT_TEMPLATE, IntentTemplate, PinItem, getPinnedItems, addPinnedItem, removePinnedItem } from './icons'
import { DEMO_HTML } from './demo'

type Bindings = {
  ADDL_KV?: KVNamespace
  AI?: any
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors())

app.get('/', (c) => {
  return c.html(DEMO_HTML)
})

app.get('/api', (c) => {
  return c.json({
    name: 'Agent-Driven Dynamic Launcher (ADDL) UI API',
    version: '1.0.0',
    endpoints: [
      'GET /',
      'GET /api',
      'POST /v1/launcher/compose',
      'GET /v1/launcher/pins',
      'POST /v1/launcher/pin',
      'DELETE /v1/launcher/pin/:id',
      'GET /v1/assets/icons'
    ]
  })
})

function findMatchingTemplate(user_intent: string): IntentTemplate {
  for (const template of INTENT_TEMPLATES) {
    for (const keyword of template.keywords) {
      if (user_intent.toLowerCase().includes(keyword.toLowerCase())) {
        return template
      }
    }
  }
  return DEFAULT_TEMPLATE
}

app.post('/v1/launcher/compose', async (c) => {
  const body = await c.req.json()
  const { user_intent, use_ai = false } = body
  const ai = c.env.AI

  let template = findMatchingTemplate(user_intent || '')
  let aiSuggestion = null

  if (use_ai && ai) {
    try {
      const categories = INTENT_TEMPLATES.map(t => ({ id: t.layout_id, keywords: t.keywords.join(', ') }))
      const prompt = `You are an intent classifier for a launcher app. Given the user's message, classify it into one of the following categories. Only respond with the category ID, no other text.
Categories:
${categories.map(c => `- ${c.id}: ${c.keywords}`).join('\n')}
User message: "${user_intent}"`

      const response = await ai.run('@cf/mistral/mistral-7b-instruct-v0.2', {
        prompt,
        max_tokens: 32
      })

      aiSuggestion = response.response?.trim()
      if (aiSuggestion) {
        const matched = INTENT_TEMPLATES.find(t => t.layout_id === aiSuggestion)
        if (matched) {
          template = matched
        }
      }
    } catch (err) {
      console.error('AI error:', err)
    }
  }

  const expiryHours = template.expiry_hours || 24
  const expiry = new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString()

  return c.json({
    layout_id: template.layout_id,
    icons: template.icons,
    clusters: template.clusters || [],
    expiry,
    ai_suggested: aiSuggestion
  })
})

app.get('/v1/launcher/pins', async (c) => {
  const kv = c.env.ADDL_KV
  const pins = await getPinnedItems(kv)
  return c.json({ pins })
})

app.post('/v1/launcher/pin', async (c) => {
  const body = await c.req.json()
  const { label, icon_url, action } = body
  const kv = c.env.ADDL_KV

  if (!label || !icon_url || !action) {
    return c.json({ error: 'Missing required fields: label, icon_url, action' }, 400)
  }

  const newPin: PinItem = {
    id: Date.now().toString(),
    label,
    icon_url,
    action,
    created_at: new Date().toISOString()
  }

  await addPinnedItem(newPin, kv)
  return c.json({ pin: newPin }, 201)
})

app.delete('/v1/launcher/pin/:id', async (c) => {
  const id = c.req.param('id')
  const kv = c.env.ADDL_KV
  const removed = await removePinnedItem(id, kv)

  if (!removed && !kv) {
    return c.json({ error: 'Pin not found' }, 404)
  }

  return c.json({ message: 'Pin deleted successfully' })
})

app.get('/v1/assets/icons', (c) => {
  return c.json({
    message: 'Asset endpoint will serve custom icons from R2 in production',
    available_icons: 'coming soon'
  })
})

export default app
