import { message } from "ant-design-vue";

interface CheckCondition {
    format?: string[];
    size?: number;
}

type ErrorType = 'size' | 'format' | null

export function beforeUploadCheck(file: File, condition: CheckCondition) {
    const { format, size } = condition;
    const isValidFormat = format ? format.includes(file.type) : true
    const isValidSize = size ? (file.size / 1024 / 1024) < size : true
    let error: ErrorType = null
    if (!isValidFormat) {
        error = 'format'
    }
    if (!isValidSize) {
        error = 'size'
    }

    return {
        passed: isValidFormat && isValidSize,
        error
    }
}


export function commonBeforeUploadCheck(file: File) {
    const { passed, error } = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 4 });
    if (error === 'format') {
        message.error('上传格式错误，请上传.jpg/png图片')
    } else if (error === 'size') {
        message.error('图片大小不能超过4M')
    }
    return passed
}


export function getImageOrigin(url: string) {
    return new Promise<{ height: number; width: number }>(((resolve, reject) => {
        const image = new Image();
        image.src = url
        image.addEventListener('load', (e) => {
            const { naturalHeight: height, naturalWidth: width } = image
            resolve({ height, width })
        })

        image.addEventListener('error', () => {
            reject('error')
        })
    }))

}
