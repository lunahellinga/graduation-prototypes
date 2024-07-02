import {globalTodos} from "@/state-management/hookstate/list";

export function getHighestId() {
  return globalTodos.reduce((acc, curr) => (acc > curr.get().id ? acc : curr.get().id),0)
}