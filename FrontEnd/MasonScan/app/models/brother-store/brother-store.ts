import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BrotherModel, BrotherSnapshot } from "../brother/brother"
import { BrotherApi } from "../../services/api/brother-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing Rick and Morty characters
 */
export const BrotherStoreModel = types
  .model("BrotherStore")
  .props({
    brothers: types.optional(types.array(BrotherModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveBrothers: (BrotherSnapshot: BrotherSnapshot[]) => {
      self.brothers.replace(BrotherSnapshot)
    }
  }))
  .actions((self) => ({
    clear: () => {
      self.saveBrothers([{
        cadastro: "",
        foto: "",
        loja: "",
        nome: "",
        situacao: ""
      }])
    }
  }))
  .actions((self) => ({
    getBrother: async (id) => {
      const brotherApi = new BrotherApi(self.environment.api)
      const result = await brotherApi.getBrother(id)

      if (result.kind === "ok") {
        self.saveBrothers(result.brothers)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type BrotherStoreType = Instance<typeof BrotherStoreModel>
export interface BrotherStore extends BrotherStoreType {}
type BrotherStoreSnapshotType = SnapshotOut<typeof BrotherStoreModel>
export interface BrotherStoreSnapshot extends BrotherStoreSnapshotType {}
export const createBrotherStoreDefaultModel = () => types.optional(BrotherStoreModel, {})
