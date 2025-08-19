import { StateGraph, MessagesAnnotation } from '@langchain/langgraph'
import { writeFileSync } from 'node:fs'

export async function networkA() {
  async function agent1(
    _: typeof MessagesAnnotation.State
  ): Promise<Partial<typeof MessagesAnnotation.State>> {
    return {}
  }
  async function agent2(
    _: typeof MessagesAnnotation.State
  ): Promise<Partial<typeof MessagesAnnotation.State>> {
    return {}
  }
  async function agent3(
    _: typeof MessagesAnnotation.State
  ): Promise<Partial<typeof MessagesAnnotation.State>> {
    return {}
  }
  async function agent4(
    _: typeof MessagesAnnotation.State
  ): Promise<Partial<typeof MessagesAnnotation.State>> {
    return {}
  }

  const workflow = new StateGraph(MessagesAnnotation)
    .addNode('agent1', agent1)
    .addNode('agent2', agent2)
    .addNode('agent3', agent3)
    .addNode('agent4', agent4)

  workflow.addEdge('__start__', 'agent1')
  workflow.addEdge('agent1', 'agent2')
  workflow.addEdge('agent1', 'agent3')
  workflow.addEdge('agent2', 'agent3')
  workflow.addEdge('agent3', 'agent4')
  workflow.addEdge('agent4', 'agent1')
  workflow.addEdge('agent4', '__end__')

  const app = workflow.compile()
  const graph = app.getGraph()
  const image = await graph.drawMermaidPng()
  const arrayBuffer = await image.arrayBuffer()

  const filePath = './build/networkA.png'
  writeFileSync(filePath, new Uint8Array(arrayBuffer))
}

export async function networkB() {
  async function agent1(
    _: typeof MessagesAnnotation.State
  ): Promise<Partial<typeof MessagesAnnotation.State>> {
    return {}
  }
  async function agent2(
    _: typeof MessagesAnnotation.State
  ): Promise<Partial<typeof MessagesAnnotation.State>> {
    return {}
  }

  const workflow = new StateGraph(MessagesAnnotation)
    .addNode('agent1', agent1)
    .addNode('agent2', agent2)

  workflow.addEdge('__start__', 'agent1')
  workflow.addEdge('agent1', 'agent2')
  workflow.addEdge('agent2', '__end__')

  const app = workflow.compile()
  const graph = app.getGraph()
  const image = await graph.drawMermaidPng()
  const arrayBuffer = await image.arrayBuffer()

  const filePath = './build/networkB.png'
  writeFileSync(filePath, new Uint8Array(arrayBuffer))
}
