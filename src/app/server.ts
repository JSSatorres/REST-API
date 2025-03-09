import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import errorHandler from 'errorhandler'
import { Server as HTTPServer } from 'http'
import httpStatus from 'http-status'
import { registerRoutes } from './routes/index.js'
import { setupSwagger } from '../../swagger.js'

export class Server {
  private express: express.Express
  private port: string
  private httpServer?: HTTPServer

  constructor(port: string) {
    this.port = port
    this.express = express()
  }

  async init() {
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(helmet())
    this.express.use(compression())

    if (process.env.NODE_ENV !== 'production') {
      this.express.use(errorHandler())
    }

    setupSwagger(this.express)
    this.express.get('/', (_req, res) => {
      res.redirect('/docs')
    })

    const router = express.Router()
    await registerRoutes(router)
    this.express.use(router)

    this.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    })
  }

  async start(): Promise<void> {
    await this.init()
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`🚀 Server running at http://localhost:${this.port} in ${this.express.get('env')} mode`)
        resolve()
      })
    })
  }

  getHTTPServer(): HTTPServer | undefined {
    return this.httpServer
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error)
          }
          return resolve()
        })
      } else {
        resolve()
      }
    })
  }
}
