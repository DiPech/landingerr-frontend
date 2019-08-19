import {randomInt} from "../util/number";

export function uploadTemporaryFile(file, callable) {
    setTimeout(function () {
        let result = getUploadedFile(file);
        callable(result);
    }, 250);
}

function getUploadedFile(file) {
    let tmpFileNames = [
        "tmp1.jpg",
        "tmp2.png",
        "tmp3.jpg",
        "tmp4.jpg",
        "tmp5.jpg"
    ];
    let fileNameIndex = randomInt(0, tmpFileNames.length - 1);
    let fileName = tmpFileNames[fileNameIndex];
    return {
        url: process.env.PUBLIC_URL + "/test/" + fileName,
        name: file.name,
        id: randomInt(10000, 99999)
    };
}
