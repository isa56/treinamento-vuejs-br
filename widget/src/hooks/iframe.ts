import {
    setApiKey,
    setCurrentPage,
    setFingerprint
} from '@/store'

interface IframeControl {
    notifyClose(): void;
    notifyOpen(): void;
    updateCoreValueOnStore(): void;
}

export default function useIframeControl(): IframeControl {

    function updateCoreValueOnStore(): void {
        if (process.env.NODE_ENV === 'production') {

            const query = new URLSearchParams(window.location.search)

            const apiKey = query.get('apikey') ?? ''
            const page = query.get('page') ?? ''
            const fingerprint = query.get('fingerprint') ?? ''

            setApiKey(apiKey)
            setCurrentPage(page)
            setFingerprint(fingerprint)

            return
        }

        setApiKey('apikey_de_teste')
        setCurrentPage('https://playground-url.com')
        setFingerprint('121321321321')

    }


    function notifyOpen(): void {
        window.parent.postMessage({
            isWidget: true,
            isOpen: true
        }, '*')
    }


    function notifyClose(): void {
        window.parent.postMessage({
            isWidget: true,
            isOpen: false
        }, '*')
    }


    return {
        notifyClose,
        notifyOpen,
        updateCoreValueOnStore
    }
}