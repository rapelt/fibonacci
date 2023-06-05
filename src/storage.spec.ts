import { describe, expect, it } from "@jest/globals";
import { Storage } from "./storage";

describe("Storage", () => {
    let storage: Storage;
    beforeEach(() => {
        return import('./storage').then(module => {
            storage = module.Storage.getInstance();
            jest.resetModules();
        });
    });

    describe("Set up", () => {
        it("should have no values in the map", () => {
            expect(storage.getNumbers().size).toEqual(0);
        });
    });

    describe("Add values", () => {
        it("should add a new value if its not in the map", () => {
            storage.addNumber(3);
            expect(storage.getNumbers().size).toEqual(1);
            expect(storage.getNumbers().get(3)).toEqual(1);
        });

        it("should add 1 to an existing value", () => {
            storage.addNumber(3);
            storage.addNumber(3);

            expect(storage.getNumbers().size).toEqual(1);
            expect(storage.getNumbers().get(3)).toEqual(2);
        });
    });

    describe("ToPrint", () => {
        it("should print empty string when no values in map", () => {
            const toPrint = storage.toPrint();
            expect(toPrint).toEqual("");
        });

        it("should print all values in map", () => {
            storage.addNumber(3);
            storage.addNumber(3);
            storage.addNumber(1);

            const toPrint = storage.toPrint();
            expect(toPrint).toEqual("3:2, 1:1");
        });
    });
});
