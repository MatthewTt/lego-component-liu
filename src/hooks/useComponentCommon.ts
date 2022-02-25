import { computed } from "vue";
import { pick } from "lodash";
import { CommonDefaultProps, TextDefaultProps } from "@/defaultProps";

const useComponentCommon = <T extends CommonDefaultProps>(props: Readonly<Partial<T>>, picks: string[]) => {
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
