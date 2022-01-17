import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Rick and Morty character model.
 */
export const BrotherModel = types.model("Brother").props({
  foto: types.maybe(types.string),
  nome: types.maybe(types.string),
  cadastro: types.maybe(types.string),
  loja: types.maybe(types.string),
  situacao: types.maybe(types.string)
})

type BrotherType = Instance<typeof BrotherModel>
export interface Brother extends BrotherType {}
type BrotherSnapshotType = SnapshotOut<typeof BrotherModel>
export interface BrotherSnapshot extends BrotherSnapshotType {}
export const createBrotherDefaultModel = () => types.optional(BrotherModel, {})
