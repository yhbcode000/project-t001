import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.hello.world.mobile',
  appName: 'Hello World',
  webDir: '../web/out',
  server: process.env.CAPACITOR_DEV === 'true' ? { url: 'http://localhost:3000', cleartext: true } : undefined
}

export default config
