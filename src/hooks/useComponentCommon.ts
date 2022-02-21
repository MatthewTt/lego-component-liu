import { computed } from "vue";
import { pick } from "lodash";
import { TextDefaultProps } from "@/defaultProps";

const useComponentCommon = (props: Readonly<Partial<TextDefaultProps>>, picks: string[]) => {
    const styleProps = computed(() => pick(props, picks))
    const handleClick = () => {
        if (props.actionType === 'url' && props.url) {
            window.location.href = props.url
        }
    }
    return {
        styleProps,
        handleClick
    }
}

export default useComponentCommon
