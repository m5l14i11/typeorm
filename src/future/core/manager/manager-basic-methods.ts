import { AnyDataSource } from "../data-source"
import {
  EntityFromReference,
  CreatedEntityModel,
  EntityCreateParams,
  MergedEntityModel,
  EntityModelPartial,
  EntityPrimaryColumnTypeMap,
  EntityReference,
} from "../entity"

/**
 * Interface for managers that implement basic entity methods supported by all drivers.
 *
 * todo: check if we can implement proper typing for save(models), remove(models), etc.
 */
export interface ManagerBasicMethods<DataSource extends AnyDataSource> {
  /**
   * Checks if entity has an id.
   * If entity has multiple ids, it will check them all.
   */
  hasId<
    Reference extends EntityReference,
    Entity extends EntityFromReference<Reference>
  >(
    entity: Reference,
    model: EntityModelPartial<DataSource, Entity>,
  ): boolean

  /**
   * Gets entity id.
   * Returns *mixed* id - if entity contains multiple primary ids - object will be returned,
   * if entity contains a single primary id - directly value will be returned.
   * Returns null if entity doesn't have at least one of its ids.
   */
  getId<
    Reference extends EntityReference,
    Entity extends EntityFromReference<Reference>
  >(
    entity: Reference,
    model: EntityModelPartial<DataSource, Entity>,
  ): EntityPrimaryColumnTypeMap<DataSource, Entity>

  /**
   * Creates a new entity instance.
   */
  create<
    Reference extends EntityReference,
    Entity extends EntityFromReference<Reference>,
    Model extends EntityCreateParams<DataSource, Entity>
  >(
    entity: Reference,
    model: Model,
  ): CreatedEntityModel<DataSource, Entity, Model>

  /**
   * Merges multiple entities (or entity-like objects) into a new entity.
   */
  merge<
    Reference extends EntityReference,
    Entity extends EntityFromReference<Reference>,
    Models extends EntityCreateParams<DataSource, Entity>[]
  >(
    entity: Reference,
    ...models: Models
  ): MergedEntityModel<DataSource, Entity, Models>
}
