var QualityColor = Object.freeze([
   { "id": 0, "color": "#9d9d9d" },
   { "id": 1, "color": "#fff" },
   { "id": 2, "color": "#1eff00" },
   { "id": 3, "color": "#0081ff" },
   { "id": 4, "color": "#c600ff" },
   { "id": 5, "color": "#ff8000" },
   { "id": 6, "color": "#e5cc80" },
   { "id": 7, "color": "#0cf" },
]);

var InventoryTypeOld = Object.freeze([
   { "id": 0, "name": "ammo" },
   { "id": 1, "name": "head" },
   { "id": 2, "name": "neck" },
   { "id": 3, "name": "shoulder" },
   { "id": 4, "name": "shirt" },
   { "id": 5, "name": "chest" },
   { "id": 6, "name": "waist" },
   { "id": 7, "name": "legs" },
   { "id": 8, "name": "feet" },
   { "id": 9, "name": "wrist" },
   { "id": 10, "name": "hands" },
   { "id": 11, "name": "finger 1" },
   { "id": 12, "name": "finger 2" },
   { "id": 13, "name": "trinket 1" },
   { "id": 14, "name": "trinket 2" },
   { "id": 15, "name": "back" },
   { "id": 16, "name": "main hand" },
   { "id": 17, "name": "off hand" },
   { "id": 18, "name": "ranged" },
   { "id": 19, "name": "tabard" },
   { "id": 20, "name": "first bag (the rightmost one)" },
   { "id": 21, "name": "second bag" },
   { "id": 22, "name": "third bag" },
   { "id": 23, "name": "fourth bag (the leftmost one)" }
]);

var InventoryType = Object.freeze([
   { "id": 0, "name": "Ammo" },
   { "id": 1, "name": "Head" },
   { "id": 2, "name": "Neck" },
   { "id": 3, "name": "Shoulder" },
   { "id": 4, "name": "Shirt" },
   { "id": 5, "name": "Chest" },
   { "id": 6, "name": "Waist" },
   { "id": 7, "name": "Legs" },
   { "id": 8, "name": "Feet" },
   { "id": 9, "name": "Wrists" },
   { "id": 10, "name": "Hands" },
   { "id": 11, "name": "Finger" },
   { "id": 12, "name": "Trinket" },
   { "id": 13, "name": "unknown" },
   { "id": 14, "name": "Off-Hand" },
   { "id": 15, "name": "unknown" },
   { "id": 16, "name": "Back" },
   { "id": 17, "name": "Two-Hand" },
   { "id": 18, "name": "unknown" },
   { "id": 19, "name": "Tabard" },
   { "id": 20, "name": "unknown" },
   { "id": 21, "name": "Main-Hand" },
   { "id": 22, "name": "unknown" },
   { "id": 23, "name": "unknown" }
]);

var InventoryClass = Object.freeze([
   {
      "id": 0, "name": "Consumable", "subclasses": [
         { "subclass": 0, "name": "Explosives and Devices" },
         { "subclass": 1, "name": "Potion" },
         { "subclass": 2, "name": "Elixir" },
         { "subclass": 3, "name": "Flask" },
         { "subclass": 5, "name": "Food & Drink" },
         { "subclass": 7, "name": "Bandage" },
         { "subclass": 8, "name": "Other" },
         { "subclass": 9, "name": "Vantus Rune" }]
   },
   {
      "id": 1, "name": "Container", "subclasses": [
         { "subclass": 0, "name": "Bag" },
         { "subclass": 1, "name": "Soul Bag" },
         { "subclass": 2, "name": "Herb Bag" },
         { "subclass": 3, "name": "Enchanting Bag" },
         { "subclass": 4, "name": "Engineering Bag" },
         { "subclass": 5, "name": "Gem Bag" },
         { "subclass": 6, "name": "Mining Bag" },
         { "subclass": 7, "name": "Leatherworking Bag" },
         { "subclass": 8, "name": "Inscription Bag" },
         { "subclass": 9, "name": "Tackle Box" },
         { "subclass": 10, "name": "Cooking Bag" }]
   },
   {
      "id": 2, "name": "Weapon", "subclasses": [
         { "subclass": 0, "name": "Axe" },
         { "subclass": 1, "name": "Axe" },
         { "subclass": 2, "name": "Bow" },
         { "subclass": 3, "name": "Gun" },
         { "subclass": 4, "name": "Mace" },
         { "subclass": 5, "name": "Mace" },
         { "subclass": 6, "name": "Polearm" },
         { "subclass": 7, "name": "Sword" },
         { "subclass": 8, "name": "Sword" },
         { "subclass": 9, "name": "Warglaives" },
         { "subclass": 10, "name": "Staff" },
         { "subclass": 11, "name": "Bear Claws" },
         { "subclass": 12, "name": "Cat Claws" },
         { "subclass": 13, "name": "Fist Weapon" },
         { "subclass": 14, "name": "Miscellaneous" },
         { "subclass": 15, "name": "Dagger" },
         { "subclass": 16, "name": "Thrown" },
         { "subclass": 17, "name": "Spear" },
         { "subclass": 18, "name": "Crossbow" },
         { "subclass": 19, "name": "Wand" },
         { "subclass": 20, "name": "Fishing Pole" },
         { "subclass": 41105, "name": "One-Handed Melee Weapon" },
         { "subclass": 41617, "name": "One-Handed Melee Weapon" },
         { "subclass": 173555, "name": "Melee Weapon" },
         { "subclass": 174067, "name": "Melee Weapon" },
         { "subclass": 262156, "name": "Ranged Weapon" },]
   },
   {
      "id": 3, "name": "Gem", "subclasses": [
         { "subclass": 0, "name": "Intellect" },
         { "subclass": 1, "name": "Agility" },
         { "subclass": 2, "name": "Strength" },
         { "subclass": 3, "name": "Stamina" },
         { "subclass": 4, "name": "Spirit" },
         { "subclass": 5, "name": "Critical Strike" },
         { "subclass": 6, "name": "Mastery" },
         { "subclass": 7, "name": "Haste" },
         { "subclass": 8, "name": "Versatility" },
         { "subclass": 9, "name": "Other" },
         { "subclass": 10, "name": "Multiple Stats" },
         { "subclass": 11, "name": "Artifact Relic" }]
   },
   {
      "id": 4, "name": "Armor", "subclasses": [
         { "subclass": 0, "name": "Miscellaneous" },
         { "subclass": 1, "name": "Cloth" },
         { "subclass": 2, "name": "Leather" },
         { "subclass": 3, "name": "Mail" },
         { "subclass": 4, "name": "Plate" },
         { "subclass": 5, "name": "Cosmetic" },
         { "subclass": 6, "name": "Shield" },
         { "subclass": 7, "name": "Libram" },
         { "subclass": 8, "name": "Idol" },
         { "subclass": 9, "name": "Totem" },
         { "subclass": 10, "name": "Sigil" },
         { "subclass": 11, "name": "Relic" },
         { "subclass": 96, "name": "Shield" }]
   },
   {
      "id": 5, "name": "Reagent", "subclasses": [
         { "subclass": 0, "name": "Reagent" },
         { "subclass": 1, "name": "Keystone" }]
   },
   {
      "id": 6, "name": "Projectile", "subclasses": [
         { "subclass": 2, "name": "Arrow" },
         { "subclass": 3, "name": "Bullet" }]
   },
   {
      "id": 7, "name": "Tradeskill", "subclasses": [
         { "subclass": 1, "name": "Parts" },
         { "subclass": 4, "name": "Jewelcrafting" },
         { "subclass": 5, "name": "Cloth" },
         { "subclass": 6, "name": "Leather" },
         { "subclass": 7, "name": "Metal & Stone" },
         { "subclass": 8, "name": "Cooking" },
         { "subclass": 9, "name": "Herb" },
         { "subclass": 10, "name": "Elemental" },
         { "subclass": 11, "name": "Other" },
         { "subclass": 12, "name": "Enchanting" },
         { "subclass": 15, "name": "Weapon Enchantment - Obsolete" },
         { "subclass": 16, "name": "Inscription" }]
   },
   {
      "id": 9, "name": "Recipe", "subclasses": [
         { "subclass": 0, "name": "Book" },
         { "subclass": 1, "name": "Leatherworking" },
         { "subclass": 2, "name": "Tailoring" },
         { "subclass": 3, "name": "Engineering" },
         { "subclass": 4, "name": "Blacksmithing" },
         { "subclass": 5, "name": "Cooking" },
         { "subclass": 6, "name": "Alchemy" },
         { "subclass": 7, "name": "First Aid" },
         { "subclass": 8, "name": "Enchanting" },
         { "subclass": 9, "name": "Fishing" },
         { "subclass": 10, "name": "Jewelcrafting" },
         { "subclass": 11, "name": "Inscription" }]
   },
   {
      "id": 11, "name": "Quiver", "subclasses": [
         { "subclass": 2, "name": "Quiver" },
         { "subclass": 3, "name": "Ammo Pouch" }]
   },
   {
      "id": 12, "name": "Quest", "subclasses": [
         { "subclass": 0, "name": "Quest" }]
   },
   {
      "id": 13, "name": "Quiver", "subclasses": [
         { "subclass": 0, "name": "Key" },
         { "subclass": 1, "name": "Lockpick" }]
   },
   {
      "id": 15, "name": "Miscellaneous", "subclasses": [
         { "subclass": 0, "name": "Junk" },
         { "subclass": 1, "name": "Reagent" },
         { "subclass": 2, "name": "Companion Pets" },
         { "subclass": 3, "name": "Holiday" },
         { "subclass": 4, "name": "Other" },
         { "subclass": 5, "name": "Mount" }]
   },
   {
      "id": 16, "name": "Glyph", "subclasses": [
         { "subclass": 0, "name": "Junk" },
         { "subclass": 1, "name": "Warrior" },
         { "subclass": 2, "name": "Paladin" },
         { "subclass": 3, "name": "Hunter" },
         { "subclass": 4, "name": "Rogue" },
         { "subclass": 5, "name": "Priest" },
         { "subclass": 6, "name": "Death Knight" },
         { "subclass": 7, "name": "Shaman" },
         { "subclass": 8, "name": "Mage" },
         { "subclass": 9, "name": "Warlock" },
         { "subclass": 10, "name": "Monk" },
         { "subclass": 11, "name": "Druid" },
         { "subclass": 12, "name": "Demon Hunter" }]
   },
   {
      "id": 17, "name": "Battle Pets", "subclasses": [
         { "subclass": 0, "name": "BattlePet" }]
   },
   {
      "id": 18, "name": "WoW Token", "subclasses": [
         { "subclass": 0, "name": "WoW Token" }]
   }
]);
