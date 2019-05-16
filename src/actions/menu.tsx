import { ActionTypeEnum, WWAction } from "./main";

export interface ChangeWordLengthAction extends WWAction {
    type: ActionTypeEnum;
    length: number;
}

export function changeWordLength(newLength: number): ChangeWordLengthAction {
    return { type: ActionTypeEnum.ChangeWordLength, length: newLength };
}

export function changeDictionary(): WWAction {
    return { type: ActionTypeEnum.ChangeDictionary };
}

export function pause(): WWAction {
    return { type: ActionTypeEnum.Pause };
}

export function resume(): WWAction {
    return { type: ActionTypeEnum.Resume };
}

export function nextRound(): WWAction {
    return { type: ActionTypeEnum.NextRound };
}
