// Criado por lrd#2774

const Util = require("../util");

module.exports = class LyaEmbedBuilder {
    constructor(options = {}) {
        this.EmbedBuilder = options;
        this._type = options.type || 'rich';
        this._title = options.title || null;
        this._description = options.description || null;
        this._fields = options.fields || [];
        this._thumbnail = options.icon || null;
        this._footer = options.footer || null;
        this._url = options.url || null;
        this._image = options.image || null;
        this._author = options.author || null;
        this._video = options.video || null;
        this._timestamp = options.timestamp || null;
    }

    title(title) {
        this._title = title;
        return this;
    }

    description(desc) {
        this._description = desc;
        return this;
    }

    field(name, value, inline = false) {
        if (name.length >= 256) throw new Error("O nome do field só pode ter no máximo 256 carácteres!");
        if (name.length >= 1024) throw new Error("A descrição do field não pode passar de 2048 carácteres!");

        this._fields.push({name, value, inline})
        return this;
    }

    author(name, icon, url) {
        this._author = {name, icon, url};
        return this;
    }

    thumbnail(icon, options = {}) {
        this._thumbnail = {icon, height: options.height, width: options.width};
        return this;
    }

    footer(text, icon) {
        this._footer = {text, icon};
        return this;
    }

    url(url) {
        this._url = url;
        return this;
    }
    
    timestamp(timestamp = Date.now()) {
        this._timestamp = timestamp;
        return this;
    }

    image(imgURL, options = {}) {
        this._image = {imgURL, height: options.height, width: options.width};
        return this;
    }

    color(color) {
        this._color = Util.color(color);
        return this;
    }

    video(video) {
        this._video = video;
        return this;
    }

    get create() {
        if (this._title.length > 256) throw new Error("O título da embed só pode ter no máximo 256 carácteres!")
        if (this._description.length > 2048) throw new Error("A descrição não pode passar de 2048 carácteres!");
        if (this._footer.text.length > 2048) throw new Error("O footer não pode passar de 2048 carácteres!");
        if (this._fields.length >= 25) throw new Error("A embed só pode ter até 25 fields!");

        return {
            embed: {
                title: this._title,
                type: this._type,
                description: this._description,
                url: this._url,
                timestamp: this._timestamp,
                color: this._color,
                footer: this._footer,
                image: this._image,
                thumbnail: this._thumbnail,
                video: this._video,
                author: this._author,
                fields: this._fields
            }
        }
    }

}