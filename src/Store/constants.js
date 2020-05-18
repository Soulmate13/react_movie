/**
 * Appends REQUEST async action type
 * @function
 * @param actionType {string} - Action type string
 * @category ActionStageCreator
 * @returns {string} - Action type full string
 */

export const REQUEST = actionType => `${actionType}_PENDING`;

/**
 * Appends SUCCESS async action type
 * @function
 * @param actionType {string} - Action type string
 * @category ActionStageCreator
 * @returns {string} - Action type full string
 */

export const SUCCESS = actionType => `${actionType}_DONE`;

/**
 * Appends FAILURE async action type
 * @function
 * @param actionType {string} - Action type string
 * @category ActionStageCreator
 * @returns {string} - Action type full string
 */

export const FAILURE = actionType => `${actionType}_ERROR`;

export const DEV = process.env.NODE_ENV === 'development';