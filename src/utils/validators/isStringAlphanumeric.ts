function isStringAlphanumeric(data: string): boolean {
    const nonAlphanumericRegex = /\W+/gi;
    return !nonAlphanumericRegex.test(data);
}

export default isStringAlphanumeric;
