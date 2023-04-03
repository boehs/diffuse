import { DetailProps, MetadataProps, LabelProps, SeparatorProps, LinkProps, TagListProps, TagListItemProps, Metadata } from '.';
import { FunctionComponent } from 'react'

export declare namespace Detail {
    /**
     * Props of the {@link Detail} React component.
     */
    export type Props = DetailProps;
    export namespace Metadata {
        /**
         * Props of the {@link Detail.Metadata} React component.
         */
        export type Props = MetadataProps;
        export namespace Label {
            /**
             * Props of the {@link Detail.Metadata.Label} React component.
             */
            export type Props = LabelProps;
        }
        export namespace Separator {
            /**
             * Props of the {@link Detail.Metadata.Separator} React component.
             */
            export type Props = SeparatorProps;
        }
        export namespace Link {
            /**
             * Props of the {@link Detail.Metadata.Link} React component.
             */
            export type Props = LinkProps;
        }
        export namespace TagList {
            /**
             * Props of the {@link Detail.Metadata.TagList} React component.
             */
            export type Props = TagListProps;
            export namespace Item {
                /**
                 * Props of the {@link Detail.Metadata.TagList.Item} React component.
                 */
                export type Props = TagListItemProps;
            }
        }
    }
}

/**
 * Renders a markdown (CommonMark) string.
 *
 * @remarks
 * Typically used as a standalone view or when navigating from a {@link List}.
 *
 * @example
 * ```typescript
 * import { Detail } from "@raycast/api";
 *
 * export default function Command() {
 *   return <Detail markdown="**Hello** _World_!" />;
 * }
 * ```
 */
export declare const Detail: FunctionComponent<DetailProps> & DetailMembers;

declare interface DetailMembers {
    /**
     * A Metadata view that will be shown in the right-hand-side of the `Detail`.
     *
     * Use it to display additional structured data about the main content shown in the `Detail` view.
     */
    Metadata: typeof Metadata;
}