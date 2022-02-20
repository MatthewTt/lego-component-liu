import { mapValues, without } from "lodash";

export interface CommonDefaultProps {
    actionType: string;
    url: string;
    height: string;
    width: string;
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    paddingBottom: string;

    borderStyle: string;
    borderColor: string;
    borderWidth: string;
    borderRadius: string;

    boxShadow: string;
    opacity: string;

    position: string;
    left: string;
    right: string;
    top: string;
}

const commonDefaultProps: CommonDefaultProps = {
    actionType: '',
    url: '',
    height: '',
    width: '',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',

    borderStyle: 'none',
    borderColor: 'none',
    borderWidth: '1px',
    borderRadius: '0',

    boxShadow: '0 0 0 #000',
    opacity: '1',

    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
}

export interface TextDefaultProps extends CommonDefaultProps{
    text: string;
    fontSize: string;
    fontFamily: string;
    fontStyle: string;
    fontWeight: string;
    textDecoration: string;
    lineHeight: string;
    textAlign: string;
    color: string;
    backgroundColor: string;
}
// font Style
export const textDefaultProps: TextDefaultProps = {
    text: '正文内容',
    fontSize: '14px',
    fontFamily: '',
    fontStyle: 'normal',
    fontWeight: 'normal',
    textDecoration: 'none',
    lineHeight: '1',
    textAlign: 'left',
    color: '#000',
    backgroundColor: '',

    ...commonDefaultProps
}

// 获取text的样式属性
export const textStyleProps = () => without(Object.keys(textDefaultProps), 'actionType', 'url', 'text')

export const transformProps = (props: TextDefaultProps) => {
    return mapValues(props, (item) => (
        {
            type: item.constructor as StringConstructor,
            default: item
        }
    ))
}
