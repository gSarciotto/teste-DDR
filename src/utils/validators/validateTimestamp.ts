function validateTimestamp(timestamp: string): boolean {
    const timestampRegex = /^(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2})$/;
    return timestampRegex.test(timestamp);
}

export default validateTimestamp;
