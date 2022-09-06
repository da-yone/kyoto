import { TaskModule } from './task.module'
import { CommandFactory } from 'nest-commander'

const task = async () => {
  await CommandFactory.run(TaskModule, [
    'log',
    'error',
    'warn',
    'debug',
    'verbose'
  ])
}

task()
