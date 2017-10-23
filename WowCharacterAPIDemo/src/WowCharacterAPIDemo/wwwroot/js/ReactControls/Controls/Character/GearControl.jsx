// TODO: STILL NEED TO DO THE COMPLICATED TOOLTIP

var Gear = React.createClass({
    render: function () {
        var items = this.props.data;
        var leftSide = "", rightSide = "", bottomSide = "";

        if (items) {        
            //Left Set - head, neck, shoulder, back, chest, shirt, tabard, wrist
            var leftSide = {
                "head": items.head,
                "neck": items.neck,
                "shoulder": items.shoulder,
                "back": items.back,
                "chest": items.chest,
                "shirt": items.shirt,
                "tabard": items.tabard,
                "wrist": items.wrist
            };

            //Right Set - hands, waist, legs, feet, finger1, finger2, trinket1, trinket2
            var rightSide = {
                "hands": items.hands,
                "waist": items.waist,
                "legs": items.legs,
                "feet": items.feet,
                "finger1": items.finger1,
                "finger2": items.finger2,
                "trinket1": items.trinket1,
                "trinket2": items.trinket2
            };

            //Bottom Set - mainhand, offhand
            var bottomSide = {
                "mainhand": items.mainHand,
                "offhand": items.offHand
            };
        }

        return (<div style={{marginTop: "120px"}}>
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
        
        var Head = React.createElement(ItemLeftSideCell, { data: side.head, emptyIcon: "EmptyHead" }, null);
        var Neck = React.createElement(ItemLeftSideCell, { data: side.neck, emptyIcon: "EmptyNeck" }, null);
        var Shoulder = React.createElement(ItemLeftSideCell, { data: side.shoulder, emptyIcon: "EmptyShoulder" }, null);
        var Back = React.createElement(ItemLeftSideCell, { data: side.back, emptyIcon: "EmptyShirt" }, null);
        var Chest = React.createElement(ItemLeftSideCell, { data: side.chest, emptyIcon: "EmptyChest" }, null);
        var Shirt = React.createElement(ItemLeftSideCell, { data: side.shirt, emptyIcon: "EmptyShirt" }, null);
        var Tabard = React.createElement(ItemLeftSideCell, { data: side.tabard, emptyIcon: "EmptyTabard" }, null);
        var Wrist = React.createElement(ItemLeftSideCell, { data: side.wrist, emptyIcon: "EmptyWrists" }, null);

        return (<div style={ { width: "370px", minHeight: "375px", float: "left", display: "inline-block" }}>
                    {Head}{Neck}{Shoulder}{Back}{Chest}{Shirt}{Tabard}{Wrist}
                </div>);
    }
});

var ItemsRightSide = React.createClass({
    render: function () {
        var side = this.props.data;

        var Hands = React.createElement(ItemRightSideCell, { data: side.hands, emptyIcon: "EmptyGloves" }, null);
        var Waist = React.createElement(ItemRightSideCell, { data: side.waist, emptyIcon: "EmptyBelt" }, null);
        var Legs = React.createElement(ItemRightSideCell, { data: side.legs, emptyIcon: "EmptyLegs" }, null);
        var Feet = React.createElement(ItemRightSideCell, { data: side.feet, emptyIcon: "EmptyFeet" }, null);
        var Finger1 = React.createElement(ItemRightSideCell, { data: side.finger1, emptyIcon: "EmptyFinger1" }, null);
        var Finger2 = React.createElement(ItemRightSideCell, { data: side.finger2, emptyIcon: "EmptyFinger2" }, null);
        var Trinket1 = React.createElement(ItemRightSideCell, { data: side.trinket1, emptyIcon: "EmptyTrinket1" }, null);
        var Trinket2 = React.createElement(ItemRightSideCell, { data: side.trinket2, emptyIcon: "EmptyTrinket2" }, null);

        return (<div style={ { width: "370px", minHeight: "375px", float: "right", display: "inline-block" } }>
                    {Hands}{Waist}{Legs}{Feet}{Finger1}{Finger2}{Trinket1}{Trinket2}
                </div>);
    }
});

var ItemsBottom = React.createClass({
    render: function () {
        var side = this.props.data;

        var Main = React.createElement(ItemIconRightCell, { data: side.mainhand, emptyIcon: "EmptyMainHand" }, null);
        var Off = React.createElement(ItemIconLeftCell, { data: side.offhand, emptyIcon: "EmptyOffHand" }, null);

        return (<div style={ { display: "flex", width: "740px" } }>
                    <div style={ { width: "52%" } }>{Main}</div>
                    <div style={ { width: "48%", marginLeft: "20px" } }>{Off}</div>
                </div>);
    }
});

var ItemLeftSideCell = React.createClass({
    render: function () {
        var info = React.createElement(ItemIconLeftCell, { data: this.props.data, emptyIcon: this.props.emptyIcon }, null);

        return (<div style={{height: "40px", marginBottom: "5px"}}>{info}</div>);
    }
});

var ItemRightSideCell = React.createClass({
    render: function () {
        var info = React.createElement(ItemIconRightCell, { data: this.props.data, emptyIcon: this.props.emptyIcon }, null);

        return (<div style={{ height: "40px", marginBottom: "5px" } }>{info}</div>);
    }
});

var ItemIconRightCell = React.createClass({
    render: function () {
        var item = this.props.data;

        var color = "white";
        var icon = "/images/Slots/" + this.props.emptyIcon + ".png";
        var opacity = 0;

        var name = "";
        var lvl = "";

        if (item) {
            icon = getIcon(item.icon);
            color = getQualityColor(item.quality);

            name = item.name;
            lvl = item.itemLevel;
        }

        return (
                <div>
                    <img src={icon} style={{ float: "right", border: "solid", borderColor: color, width: "42px", height: "42px", backgroundSize: "contains"}} />
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

        var color = "white";
        var icon = "/images/Slots/" + this.props.emptyIcon + ".png";
        var opacity = 0;

        var name = "";
        var lvl = "";

        if (item) {
            icon = getIcon(item.icon);
            color = getQualityColor(item.quality);

            name = item.name;
            lvl = item.itemLevel;
        }

        return (
                <div>
                    <img src={icon} style={{ float: "left", border: "solid", borderColor: color, width: "42px", height: "42px", backgroundSize: "contains"}} />
                    <div style={{ display: "inline-block", marginLeft: "5px", verticalAlign: "middle", fontSize: "small" } }>
                        <div style={{ color: color } }>{name}</div>
                        <div style={{ color: "white" } }>{lvl}</div>
                    </div>
                </div>
                )
    }
});
