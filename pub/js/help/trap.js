export const trap = {

    onMetaTagClick: function(metaId) {
        const meta = document.getElementById(metaId)
        const path = metaId.split('::')[1]

        if (path) {
            location.href = `#.${path}`

            // remove previous selection
            const tags = document.querySelectorAll('.tag');
            tags.forEach(tag => {
                if (tag.classList.contains('tag-selected')) {
                    tag.classList.remove('tag-selected')
                }
            })

            meta.classList.add('tag-selected')
        }
    }

}
