export class FigmaNodeSelector {
    constructor() {
        this.nodes = [];
        // Check if there's at least one selected node to avoid errors
        if (figma.currentPage.selection.length > 0) {
            this.collectAllNodes(figma.currentPage.selection[0]); // Start from the first selected node
        }
    }

    collectAllNodes(node) {
        this.nodes.push(node);
        // Recursively collect all child nodes
        if ("children" in node) {
            node.children.forEach(child => {
                this.collectAllNodes(child);
            });
        }
    }
    
    parseNodeData(node) {
        return JSON.parse(node.getSharedPluginData("figma.attributes", "attributes") || '{}');
    }

    findByClassName(className, nodes) {
        return nodes.filter(node => {
            const data = this.parseNodeData(node);
            return data.attributes && data.attributes.class && data.attributes.class.split(' ').includes(className);
        });
    }

    findByTagName(tagName, nodes) {
        return nodes.filter(node => {
            const data = this.parseNodeData(node);
            return data.tag === tagName;
        });
    }

    findByAttribute(attribute, value, nodes) {
        return nodes.filter(node => {
            const data = this.parseNodeData(node);
            return data.attributes && data.attributes[attribute] === value;
        });
    }

    find(selector) {
        let currentNodes = [...this.nodes];
        const compoundSelectors = selector.split(' ');

        compoundSelectors.forEach(compound => {
            const subSelectors = compound.match(/([#.]?[^#.]+)/g);

            subSelectors.forEach(subSel => {
                if (subSel.startsWith('.')) {
                    const className = subSel.substring(1);
                    currentNodes = this.findByClassName(className, currentNodes);
                } else if (subSel.startsWith('#')) {
                    const idValue = subSel.substring(1);
                    currentNodes = this.findByAttribute('id', idValue, currentNodes);
                } else {
                    currentNodes = this.findByTagName(subSel, currentNodes);
                }
            });
        });

        return currentNodes;
    }

    first(selector) {
        return this.find(selector)[0] || null;
    }

    last(selector) {
        const found = this.find(selector);
        return found[found.length - 1] || null;
    }
}

export const $F = (function() {
    const selectorInstance = new FigmaNodeSelector();
    return function(selectorString) {
        return selectorInstance.find(selectorString);
    };
})();
