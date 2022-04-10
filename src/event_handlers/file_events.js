import {
    saveFile,
    loadFile,
    loadFileFromHandle,
} from "../util";

class FileEvents {
    constructor(state, model, eventTable, scripter) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
        this.scripter = scripter;
        this.prevFileHandle = null;
    }

    addEvents() {
        this.eventTable.addEvent(
            "saveFile",
            e => e.keydown && e.keyboard.control && e.keyboard.s,
            async e => {
                e.preventDefault();
                try {
                    const boxesStr = JSON.stringify(this.model.boxes.boxes);
                    const connStr = JSON.stringify([...this.model.boxes.connections]);
                    await saveFile(boxesStr + "\n" + connStr);
                } catch (e) {
                    console.log(e);
                }
                this.state.cur.keyboard.control = false;
                this.state.cur.keyboard.s = false;
            }
        );

        this.eventTable.addEvent(
            "loadFile",
            e => e.keydown && e.keyboard.control && !e.keyboard.shift && e.keyboard.l,
            async e => {
                e.preventDefault();
                try {
                    const [_, content] = await loadFile();
                    this.model.init();
                    const [boxesStr, connStr] = content.split(/\n/);
                    this.model.boxes.loadBoxes(boxesStr);
                    this.model.boxes.loadConnections(connStr);
                } catch (e) {
                    console.log(e);
                }
                this.state.cur.keyboard.control = false;
                this.state.cur.keyboard.l = false;
            }
        );

        this.eventTable.addEvent(
            "loadScript",
            e => e.keydown && e.keyboard.control && e.keyboard.shift && !e.keyboard.alt && e.keyboard.l,
            async e => {
                e.preventDefault();
                try {
                    let oldScriptElt = document.getElementById("userScriptElt");
                    if (oldScriptElt !== null) {
                        oldScriptElt.remove();
                    }
                    let scriptElt = document.createElement("script");
                    scriptElt.id = "userScriptElt";
                    const [fileHandle, content] = await loadFile();
                    this.prevFileHandle = fileHandle;
                    const textNode = document.createTextNode(content);
                    scriptElt.appendChild(textNode);
                    const targetElt = document.getElementById("userScripts");
                    targetElt.append(scriptElt);
                    this.model.init();
                    setTimeout(() => {}, 0);    // wait for one event-cycle
                    this.scripter.runUserFunction(userFunction);
                } catch (e) {
                    console.log(e);
                }
                this.state.cur.keyboard.control = false;
                this.state.cur.keyboard.shift = false;
                this.state.cur.keyboard.l = false;
            }
        );

        this.eventTable.addEvent(
            "reloadScript",
            e => e.keydown && e.keyboard.control && e.keyboard.shift && e.keyboard.alt && e.keyboard.l,
            async e => {
                e.preventDefault();
                try {
                    if (this.prevFileHandle === null) {
                        return;
                    }
                    let oldScriptElt = document.getElementById("userScriptElt");
                    if (oldScriptElt !== null) {
                        oldScriptElt.remove();
                    }
                    const scriptElt = document.createElement("script");
                    scriptElt.id = "userScriptElt";
                    const content = await loadFileFromHandle(this.prevFileHandle);
                    const textNode = document.createTextNode(content);
                    scriptElt.appendChild(textNode);
                    const targetElt = document.getElementById("userScripts");
                    targetElt.append(scriptElt);
                    this.model.init();
                    setTimeout(() => {}, 0);    // wait for one event-cycle
                    this.scripter.runUserFunction(userFunction);
                } catch (e) {
                    console.log(e);
                }
                this.state.cur.keyboard.control = false;
                this.state.cur.keyboard.shift = false;
                this.state.cur.keyboard.alt = false;
                this.state.cur.keyboard.l = false;
            }
        );
    }
}

export { FileEvents };
