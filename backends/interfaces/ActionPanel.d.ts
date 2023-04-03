import { SectionProps, Section, Image, Keyboard, SearchBarInterface, List, Grid, Detail } from '.';
import { Action } from "./Action";
import { FunctionComponent, ReactNode, ReactElement } from 'react' 

/**
 * Exposes a list of actions that can be performed by the user.
 *
 * @remarks
 * Often items are context-aware, e.g. based on the selected list item. Actions can be grouped into semantic
 * sections and can have keyboard shortcuts assigned.
 *
 * The first and second action become the primary and secondary action. They automatically get the default keyboard shortcuts assigned.
 * In {@link List}, {@link Grid}, and {@link Detail}, this is `↵` for the primary and `⌘` `↵` for the secondary action. In {@link Form} it's `⌘` `↵` for the primary and
 * `⌘` `⇧` `↵` for the secondary.
 * Keep in mind that while you can specify an alternative shortcut for the primary and secondary actions, it won't be displayed in the Action Panel.
 *
 * @example
 * ```typescript
 * import { ActionPanel, Action, List } from "@raycast/api";
 *
 * export default function Command() {
 *   return (
 *     <List navigationTitle="Open Pull Requests">
 *       <List.Item
 *         title="Docs: Update API Reference"
 *         subtitle="#1"
 *         actions={
 *           <ActionPanel title="#1 in raycast/extensions">
 *             <Action.OpenInBrowser url="https://github.com/raycast/extensions/pull/1" />
 *             <Action.CopyToClipboard
 *               title="Copy Pull Request URL"
 *               content="https://github.com/raycast/extensions/pull/1"
 *             />
 *           </ActionPanel>
 *         }
 *       />
 *     </List>
 *   );
 * }
 * ```
 */
export declare const ActionPanel: FunctionComponent<ActionPanelProps> & ActionPanelMembers;

export declare namespace ActionPanel {
    /**
     * Props of the {@link ActionPanel} React component.
     */
    export type Props = ActionPanelProps;
    /**
     * Supported children for the {@link ActionPanel} components.
     */
    export type Children = ActionPanelChildren;
    export namespace Section {
        /**
         * Props of the {@link ActionPanel.Section} React component.
         */
        export type Props = SectionProps;
        /**
         * Supported children for the {@link ActionPanel.Section} component.
         */
        export type Children = SectionChildren;
    }
    export namespace Submenu {
        /**
         * Props of the {@link ActionPanel.Submenu} React component.
         */
        export type Props = SubmenuProps;
        /**
         * Supported children for the {@link ActionPanel.Submenu} components.
         */
        export type Children = SubmenuChildren;
    }
}

declare type ActionPanelChildren = ReactElement<ActionPanel.Section.Props> | ReactElement<ActionPanel.Section.Props>[] | ActionPanel.Section.Children | null;

declare interface ActionPanelMembers {
    /**
     * A group of visually separated items.
     *
     * @remarks
     * Use sections when the {@link ActionPanel} contains a lot of actions to help guide the user to related actions.
     * For example, create a section for all copy actions.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Action, List } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List navigationTitle="Open Pull Requests">
     *       <List.Item
     *         title="Docs: Update API Reference"
     *         subtitle="#1"
     *         actions={
     *           <ActionPanel title="#1 in raycast/extensions">
     *             <ActionPanel.Section title="Copy">
     *               <Action.CopyToClipboard title="Copy Pull Request Number" content="#1" />
     *               <Action.CopyToClipboard
     *                 title="Copy Pull Request URL"
     *                 content="https://github.com/raycast/extensions/pull/1"
     *               />
     *               <Action.CopyToClipboard title="Copy Pull Request Title" content="Docs: Update API Reference" />
     *             </ActionPanel.Section>
     *             <ActionPanel.Section title="Danger zone">
     *               <Action title="Close Pull Request" onAction={() => console.log("Close PR #1")} />
     *             </ActionPanel.Section>
     *           </ActionPanel>
     *         }
     *       />
     *     </List>
     *   );
     * }
     * ```
     */
    Section: typeof Section;
    /**
     * An action that replaces the current ActionPanel with its children when selected.
     *
     * @remarks
     * This is handy when an action needs to select from a range of options. For example, to add a label to a GitHub pull request
     * or an assignee to a todo.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Color, Icon, List, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List navigationTitle="Open Pull Requests">
     *       <List.Item
     *         title="Docs: Update API Reference"
     *         subtitle="#1"
     *         actions={
     *           <ActionPanel title="#1 in raycast/extensions">
     *             <ActionPanel.Submenu title="Add Label">
     *               <Action
     *                 icon={{ source: Icon.Circle, tintColor: Color.Red }}
     *                 title="Bug"
     *                 onAction={() => console.log("Add bug label")}
     *               />
     *               <Action
     *                 icon={{ source: Icon.Circle, tintColor: Color.Yellow }}
     *                 title="Enhancement"
     *                 onAction={() => console.log("Add enhancement label")}
     *               />
     *               <Action
     *                 icon={{ source: Icon.Circle, tintColor: Color.Blue }}
     *                 title="Help Wanted"
     *                 onAction={() => console.log("Add help wanted label")}
     *               />
     *             </ActionPanel.Submenu>
     *           </ActionPanel>
     *         }
     *       />
     *     </List>
     *   );
     * }
     * ```
     */
    Submenu: typeof Submenu;
}

declare interface ActionPanelProps {
    /**
     * Sections or Actions. If {@link Action} elements are specified, a default section is automatically created.
     */
    children?: ReactNode;
    /**
     * The title displayed at the top of the panel
     */
    title?: string;
}

/**
 * See {@link ActionPanel.Submenu}
 */
declare const Submenu: FunctionComponent<SubmenuProps>;

declare type SubmenuChildren = ReactElement<SectionProps> | ReactElement<SectionProps>[] | SectionChildren | null;

/**
 * See {@link ActionPanel.Submenu.Props}.
 */
export declare interface SubmenuProps extends SearchBarInterface {
    /**
     * The title displayed for submenu.
     */
    title: string;
    /**
     * The icon displayed for the submenu.
     */
    icon?: Image.ImageLike;
    /**
     * The keyboard shortcut for the submenu.
     */
    shortcut?: Keyboard.Shortcut;
    /**
     * Items of the submenu.
     *
     * @example
     * ```typescript
     * <ActionPanel.Submenu title="Submenu">
     *    <Action title="Just an action" />
     * </ActionPanel.Submenu>
     * ```
     *
     * @remarks
     * If {@link Action} elements are specified, a default section is automatically created.
     * Use {@link ActionPanel.Submenu} as parent when specifying sub-menu's children to make code is more readable.
     */
    children?: ReactNode;
    /**
     * Callback that is triggered when the Submenu is opened.
     *
     * This callback can be used to fetch its content lazily:
     * ```js
     * function LazySubmenu() {
     *   const [content, setContent] = useState(null)
     *
     *   return (
     *     <ActionPanel.Submenu onOpen={() => fetchSubmenuContent().then(setContent)}>
     *       {content}
     *     </ActionPanel.Submenu>
     *   )
     * }
     * ```
     */
    onOpen?: () => void;
    /**
     * Indicates whether the ActionPanel.Submenu should be focused automatically when the parent ActionPanel (or Actionpanel.Submenu) opens.
     */
    autoFocus?: boolean;
}

declare type SectionChildren = ReactElement<Action.Props> | ReactElement<Action.Props>[] | ReactElement<SubmenuProps> | Array<ReactElement<SubmenuProps>> | Array<ReactElement<SubmenuProps> | ReactElement<Action.Props>> | null;