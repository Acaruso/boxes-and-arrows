function userFunction(logger) {
    let str = "\nhello world\ntest";
    let id = logger.newNode("", null);
    logger.pushString(str, id);
    logger.pushString("\n", id);
    logger.pushString("\n", id);
    logger.pushString("more test", id);
}
