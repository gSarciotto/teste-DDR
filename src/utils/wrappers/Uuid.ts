import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export interface IUuid {
    generate: () => string;
    validate: (input: string) => boolean;
}

export class UuidV4 implements IUuid {
    generate(): string {
        return uuidv4();
    }

    validate(input: string): boolean {
        return uuidValidate(input);
    }
}

export default UuidV4;
