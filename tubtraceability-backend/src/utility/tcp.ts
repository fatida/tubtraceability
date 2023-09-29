import * as net from 'net'
import  logger  from './logger'

class TCPClient {
  public client: net.Socket
  public host: string
  public port: number
  public isConnected: boolean = false

  constructor(host: string, port: number) {
    this.host = host
    this.port = port
    this.client = new net.Socket()
    this.client.on('connect', this.onConnect.bind(this))
    this.client.on('data', this.onData.bind(this))
    this.client.on('close', this.onClose.bind(this))
    this.client.on('error', this.onError.bind(this))
  }

  public onConnect() {
    this.isConnected = true
    logger.info(`Connected to ${this.host}:${this.port}`)
  }

  public onData(data: Buffer) {
    const message = data.toString()
    logger.info(`Received message: ${message}`)
  }

  public onClose() {
    this.client.destroy()
    this.isConnected = false
    logger.info(`Disconnected from ${this.host}:${this.port}`)
    this.reconnect()
  }

  public onError(error: Error) {
    logger.error(`Error: ${error.message}`)
    this.client.destroy()
  }

  public reconnect() {
    setTimeout(() => {
      if (!this.isConnected) {
        logger.info(`Reconnecting to ${this.host}:${this.port}`)
        this.client.connect(this.port, this.host)
      }
    }, 60000) // Retry every 60 seconds
  }

  public connect() {
    this.client.connect(this.port, this.host)
  }

  public send(message: string) {
    if (this.isConnected) {
      this.client.write(message)
    } else {
      logger.error('Client is not connected')
    }
  }

  public disconnect() {
    this.client.end()
  }
}

export default TCPClient
