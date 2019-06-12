import {randomInt} from "./number";

export function callIfRandom(percent, callable) {
    if (randomInt(1, 100) <= percent) {
        callable();
    }
}

export function repeatExactTimes(number, callable) {
    for (let i = 0; i < number; i++) {
        callable(i);
    }
}

export function repeatRandomTimes(min, max, callable) {
    repeatExactTimes(randomInt(min, max), callable);
}
