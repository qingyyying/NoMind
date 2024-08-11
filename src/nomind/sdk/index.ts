import AddNode from './addNode'

export enum SDKKeys {
  // 新增节点
  ADD_CHILD_NODE = 'add_child_node', 
  // 删除节点
  DELETE_NODE = 'delete_node'
}


export const SDKLoader = {
  [SDKKeys.ADD_CHILD_NODE]: {
    load: AddNode
  }
}
