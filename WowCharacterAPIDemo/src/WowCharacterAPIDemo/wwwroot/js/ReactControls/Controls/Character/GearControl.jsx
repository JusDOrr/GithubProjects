var Gear = React.createClass({
    render: function () {
        var items = this.props.data;
        var leftSide = "", rightSide = "", bottomSide = "";

        if (items) {        
            leftSide = { "head": items.head, "neck": items.neck,
                         "shoulder": items.shoulder, "back": items.back,
                         "chest": items.chest, "shirt": items.shirt,
                         "tabard": items.tabard, "wrist": items.wrist };

            rightSide = { "hands": items.hands, "waist": items.waist,
                          "legs": items.legs, "feet": items.feet,
                          "finger1": items.finger1, "finger2": items.finger2,
                          "trinket1": items.trinket1, "trinket2": items.trinket2 };

            bottomSide = { "mainhand": items.mainHand, "offhand": items.offHand };
        }

        return (<div style={{marginTop: "20px"}}>
                    <div>
                        <ItemsLeftSide data={leftSide} />
                        <ItemsRightSide data={rightSide} />
                    </div>
                    <ItemsBottom data={bottomSide} />
                </div>);
    }
});

var ItemsLeftSide = React.createClass({
    render: function () {
        var side = this.props.data;
        
        var Head = React.createElement(ItemIconLeftCell, { data: side.head, emptyIcon: "EmptyHead" }, null);
        var Neck = React.createElement(ItemIconLeftCell, { data: side.neck, emptyIcon: "EmptyNeck" }, null);
        var Shoulder = React.createElement(ItemIconLeftCell, { data: side.shoulder, emptyIcon: "EmptyShoulder" }, null);
        var Back = React.createElement(ItemIconLeftCell, { data: side.back, emptyIcon: "EmptyShirt" }, null);
        var Chest = React.createElement(ItemIconLeftCell, { data: side.chest, emptyIcon: "EmptyChest" }, null);
        var Shirt = React.createElement(ItemIconLeftCell, { data: side.shirt, emptyIcon: "EmptyShirt" }, null);
        var Tabard = React.createElement(ItemIconLeftCell, { data: side.tabard, emptyIcon: "EmptyTabard" }, null);
        var Wrist = React.createElement(ItemIconLeftCell, { data: side.wrist, emptyIcon: "EmptyWrists" }, null);

        return (<div className="gear-left-side">
                    {Head}{Neck}{Shoulder}{Back}{Chest}{Shirt}{Tabard}{Wrist}
                </div>);
    }
});

var ItemsRightSide = React.createClass({
    render: function () {
        var side = this.props.data;

        var Hands = React.createElement(ItemIconRightCell, { data: side.hands, emptyIcon: "EmptyGloves" }, null);
        var Waist = React.createElement(ItemIconRightCell, { data: side.waist, emptyIcon: "EmptyBelt" }, null);
        var Legs = React.createElement(ItemIconRightCell, { data: side.legs, emptyIcon: "EmptyLegs" }, null);
        var Feet = React.createElement(ItemIconRightCell, { data: side.feet, emptyIcon: "EmptyFeet" }, null);
        var Finger1 = React.createElement(ItemIconRightCell, { data: side.finger1, emptyIcon: "EmptyFinger1" }, null);
        var Finger2 = React.createElement(ItemIconRightCell, { data: side.finger2, emptyIcon: "EmptyFinger2" }, null);
        var Trinket1 = React.createElement(ItemIconRightCell, { data: side.trinket1, emptyIcon: "EmptyTrinket1" }, null);
        var Trinket2 = React.createElement(ItemIconRightCell, { data: side.trinket2, emptyIcon: "EmptyTrinket2" }, null);

        return (<div className="gear-right-side">
                    {Hands}{Waist}{Legs}{Feet}{Finger1}{Finger2}{Trinket1}{Trinket2}
                </div>);
    }
});

var ItemsBottom = React.createClass({
    render: function () {
        var side = this.props.data;

        var Main = React.createElement(ItemIconRightCell, { data: side.mainhand, emptyIcon: "EmptyMainHand" }, null);
        var Off = React.createElement(ItemIconLeftCell, { data: side.offhand, emptyIcon: "EmptyOffHand" }, null);

        return (<div style={ { display: "flex", width: "var(--ControlWidth)" } }>
                    <div style={ { width: "52%" } }>{Main}</div>
                    <div style={ { width: "48%", marginLeft: "20px" } }>{Off}</div>
                </div>);
    }
});

var ItemIconRightCell = React.createClass({
    render: function () {
        var item = this.props.data;

        var color = "grey";
        var icon = "/images/Slots/" + this.props.emptyIcon + ".png";
        var key = Math.random();

        var name = "";
        var lvl = "";
        var tooltipClass = "";
        var tooltipGearClass = "";

        // If not, we show the empty slot
        if (item) {
            icon = getIcon(item.icon);
            color = getQualityColor(item.quality);
            key = item.id;

            name = item.name;
            lvl = item.itemLevel;

            tooltipClass = "tooltip-gear";
            tooltipGearClass = "tooltiptext-gear tooltip-top-right-gear";
        }

        return (
                <div className="gear-item-cell">
                    <div className={tooltipClass}>
                        <GearToolTip key={key} cssClass={tooltipGearClass} item={item} />
                        <img src={icon} className="gear-item-cell-icon" style={{ float: "right", borderColor: color }} />
                    </div>
                    <div style={{ float: "right", marginRight: "5px", verticalAlign: "middle", fontSize: "small" } }>
                        <div style={{ color: color } }>{name}</div>
                        <div style={{ color: "white", float: "right" } }>{lvl}</div>
                    </div>
                </div>
                )
}
});

var ItemIconLeftCell = React.createClass({
    render: function () {
        var item = this.props.data;

        var color = "grey";
        var icon = "/images/Slots/" + this.props.emptyIcon + ".png";
        var key = Math.random();

        var name = "";
        var lvl = "";
        var tooltipClass = "";
        var tooltipGearClass = "";

        // If not, we show the empty slot
        if (item) {
            icon = getIcon(item.icon);
            color = getQualityColor(item.quality);
            key = item.id;

            name = item.name;
            lvl = item.itemLevel;

            tooltipClass = "tooltip-gear";
            tooltipGearClass = "tooltiptext-gear tooltip-top-left-gear";
        }

        return (
                <div className="gear-item-cell">
                    <div className={tooltipClass}>
                        <GearToolTip key={key} cssClass={tooltipGearClass} item={item} />
                        <img src={icon} className="gear-item-cell-icon" style={{ float: "left", borderColor: color }} />
                    </div>
                    <div style={{ display: "inline-block", marginLeft: "5px", verticalAlign: "middle", fontSize: "small" } }>
                        <div style={{ color: color } }>{name}</div>
                        <div style={{ color: "white" } }>{lvl}</div>
                    </div>
                </div>
                )
    }
});

var GearToolTip = React.createClass({
    getInitialState: function () {
        return { item: null };
    },
    componentDidMount: function () {
        if (!this.props.item)
            return;

        GetItem(this.onload, this.onerror, this.props.item.id, this.props.item.context, this.props.item.bonusLists);
    },
    onload: function (item) {
        this.setState({ item: item });
    },
    onerror: function (e) {
        // Nothing with this yet
    },
    getBind: function(bind) {
        if (bind === 1)
            return "Binds when picked up";
        else if (bind === 2)
            return "Binds when equipped";
        else
            return bind;
    },
    getSpellDesc: function(spell) {
        var trigger = spell.trigger;
        if (trigger === "ON_USE")
            trigger = "Use: " + spell.spell.description;
        else if (trigger === "ON_EQUIP")
            trigger = "Equip: " + spell.spell.description;
        else
            trigger = spell.spell.description;

        return React.createElement("div", { key: spell.spellId }, trigger);
    },
    getSellPrice: function (price) {
        if (price === 0)
            return "";

        var copper = price % 100;
        var silver = ((price - copper) % 10000) / 100;
        var gold = (price - (silver * 100) - copper) / 10000;

        // Gross. Fix This
        return React.createElement("div", { key: price, style: { display: "inline-flex" } },
                    React.createElement('div', { style: { display: "inline-flex" } },
                        React.createElement('div', {}, "Sell Price: " + gold),
                        React.createElement('div', { className:"gear-tooltip-price-icon", style: { backgroundImage: "url(../images/Icons/gold.gif)" }}, null)),
                    React.createElement('div', { className: "gear-tooltip-price" },
                        React.createElement('div', {}, silver),
                        React.createElement('div', { className: "gear-tooltip-price-icon", style: { backgroundImage: "url(../images/Icons/silver.gif)" }}, null)),
                    React.createElement('div', { className: "gear-tooltip-price" },
                        React.createElement('div', {}, copper),
                        React.createElement('div', { className: "gear-tooltip-price-icon", style: { backgroundImage: "url(../images/Icons/copper.gif)" }}, null)));
    },
    render: function () {
        if (!this.state.item || !this.props.item)
            return (<div/>);

        var item = this.state.item;

        var name = item.name;
        var qlty = getQualityColor(item.quality);

        // NEED TO THINK ABOUT
        // itemSet and socketInfo

        // Example: Relinquished Warforged
        var nameDesc = item.nameDescription;
        var nameDescColor = "#" + item.nameDescriptionColor;
        var level = item.itemLevel;
        var binds = this.getBind(item.itemBind);
        var armor = (item.baseArmor > 0) ? item.baseArmor + " Armor" : "";
        var invType = getInventoryType(item.inventoryType);
        var category = getInventoryClass(item.itemClass, item.itemSubClass);

        var stats = item.bonusStats.sort(function (a, b) { if (a.stat > 70) return -1; else if (b.stat > 70) return 1; else return (a.stat > b.stat) ? 1 : ((b.stat > a.stat) ? -1 : 0); }).map(function (stat) {
            var txtcolor = (stat.stat < 8 || stat.stat > 70) ? "White" : "Green";

            return React.createElement("div", { key: stat.stat, style: { color: txtcolor } }, "+" + stat.amount + " " + getStatDesc(stat.stat));
        });

        var displaySpell = (item.itemSpells) ? item.itemSpells.find(x => x.spell.description !== "") : undefined;
        var spell = (displaySpell) ? this.getSpellDesc(displaySpell) : "";

        var maxDurability = (item.maxDurability !== 0) ? "Durability " + item.maxDurability + " \/ " + item.maxDurability : "";
        var description = (item.description) ? "\"" + item.description + "\"" : "";

        var reqLevel = (item.requiredLevel > 0) ? "Requires Level " + item.requiredLevel : "";
        var sellPrice = this.getSellPrice(item.sellPrice);

        return (
                <div className={this.props.cssClass} style={{fontSize: "12px"}}>
                    <div style={{margin: "0 10px 0 10px"}}>
                        <div style={{ color: qlty, fontSize: "14px" } }>{name}</div>
                        <div style={{ color: nameDescColor } }>{nameDesc}</div>
                        <div style={{ color: "Gold" }}>Item Level {level}</div>
                        <div style={{ color: "White" }}>{binds}</div>
                        <div style={{ display: "flex", justifyContent: "space-between"}}>
                            <div style={{ color: "White" }}>{invType}</div>
                            <div style={{ color: "White" }}>{category}</div>
                        </div>
                        <div style={{ color: "White" } }>{armor}</div>
                        <div>{stats}</div>
                        <div></div>
                        <div style={{ color: "Green", marginTop: "10px" } }>{spell}</div>
                        <div style={{ color: "Gold" }}>{description}</div>
                        <div></div>
                        <div style={{ color: "White", marginTop: "10px" }}>{maxDurability}</div>
                        <div style={{ color: "White" }}>{reqLevel}</div>
                        <div style={{ color: "White" }}>{sellPrice}</div>
                    </div>
                </div>
                )
    }
});
