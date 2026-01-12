import en from './messages/en.json'

type Messages = typeof en

declare global {
  type IntMessages = Messages
}

export {}
