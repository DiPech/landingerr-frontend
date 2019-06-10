import {randomIntInterval} from "./number";

export function callIfRandom(percent, callable) {
    if (randomIntInterval(1, 100) <= percent) {
        callable();
    }
}

export function repeatExactTimes(number, callable) {
    for (let i = 0; i < number; i++) {
        callable(i);
    }
}

export function repeatRandomTimes(min, max, callable) {
    repeatExactTimes(randomIntInterval(min, max), callable);
}
