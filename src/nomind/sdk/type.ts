import { Graphics } from "../../../../neta-render/es";
import { NetaGraph } from "../../../../neta-render/es/NetaGraph";
import { NodeModel } from "../../../../neta-render/es/types";

export interface ISdkProps {
  instance: NetaGraph
  target?: Graphics
  targetModel?: NodeModel
}