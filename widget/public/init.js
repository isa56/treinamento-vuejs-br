const { isJsxFragment } = require("typescript")

function init(apiKey) {

    // Função que é carregada quando o script do fingerprint carrega
    function handleLoadWidget() {
        const page = `${window.location.origin}${window.location.pathname}` // encontrar a página usando as funções do browser
        const fp = await window.FingerprintJS.load()    // carregar script
        const fingerprint = await fp.get()

        const WIDGET_URL = `https://treinamento-vuejsbr-widget.netlify.app?api_key=${apiKey}&page=${page}&fingerprint=${fingerprint.visitor}`   // url do widget


        const config = { method: 'HEAD' }
        const res = await fetch(`https://backend-treinamento-vuejsbrasil.vercel.app/apikey/exists?apikey=${apiKey}`)    // descobre se a api key existe

        if (res.status === 200) {    // se existir, cria o iframe com o widget
            const iframe = document.createElement('iframe')

            iframe.src = WIDGET_URL
            iframe.id = 'feedbacker-iframe'

            iframe.style.position = 'fixed'
            iframe.style.bottom = '0px'
            iframe.style.right = '0px'
            iframe.style.overflow = 'hidden'
            iframe.style.border = '0px'
            iframe.style.zInder = '9999'

            document.body.appendChild(iframe)
            window.addEventListener('message', (event) => {

                if (!event.data.isWidget) return

                if (event.data.isOpen) {
                    iframe.width = '100%'
                    iframe.height = '100%'
                } else {
                    iframe.width = '300px'
                    iframe.height = '150px'
                }
            })

            return

        }

        console.log('* [feedbacker] was not loaded because api key does not exists')

    }

    // Carregando script do fingerprintjs:
    // https://github.com/fingerprintjs/fingerprintjs
    const script = document.createElement('script');
    script.src = '//cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js'
    script.async = 'async'
    script.addEventListener('load', handleLoadWidget)
    document.body.appendChild(script)

}

window.init = init
