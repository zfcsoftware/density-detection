function countOccurrences(str, searchStr) {
    str = String(str).replace(/\n/g, ' ').replace(/\r/g, ' ').replace(/\t/g, ' ').trim()
    searchStr = String(searchStr).replace(/\n/g, ' ').replace(/\r/g, ' ').replace(/\t/g, ' ').trim()

    return slugify(str).split(slugify(searchStr)).length - 1;
}

function slugify(text) {
    return text
        .toUpperCase()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '')
}

const removeFirstWord = ({ text = '', count = 0 }) => {
    var new_text = text.split(' ')
    for (let i = 0; i < count; i++) {
        new_text.shift()
    }
    new_text = String(new_text.join(' ')).trim()
    return new_text
}

const parsedText = ({ text = '', count = 1 }) => {

    var response_data = []

    var content_list = []


    text = String(text).replace(/\n/g, ' ').replace(/\r/g, ' ').replace(/\t/g, ' ').trim()


    for (let i = 0; i < count; i++) {
        content_list.push(removeFirstWord({
            text: text,
            count: i
        }))
    }

    for (var content_item of content_list) {
        var packet = []
        content_item = String(content_item).replace(/\n/g, ' ').replace(/\r/g, ' ').replace(/\t/g, ' ').trim()
        var arr = content_item.split(' ')
        arr = arr.filter(el => (String(el).replace(/ /g, '').length > 0))

        for (let i = 0; i < arr.length; i += count) {
            var packet_item = arr.slice(i, i + count)
            if (packet_item.length > 0) {
                packet.push(packet_item.join(' '))
            }
        }

        var detector = packet.filter(el => (content_list.find(es => (countOccurrences(slugify(String(es)), slugify(String(el))) > 1))) ? true : false)
        response_data = response_data.concat(detector)
    }
    return response_data
}

const detect = ({ text = '' }) => {
    var response = []
    var while_status = true
    var while_index = 1
    while (while_status) {
        var check_index = parsedText({
            text: text,
            count: while_index
        })
        if (check_index.length > 0) {
            check_index.forEach(item => {
                response.push({
                    item: item,
                    count: countOccurrences(text, item),
                    parseCount: while_index
                })
            });
        } else {
            while_status = false
        }
        while_index++
    }
    response = response.sort((a, b) => b.parseCount - a.parseCount);
    return response
}

module.exports = {
    detect
}