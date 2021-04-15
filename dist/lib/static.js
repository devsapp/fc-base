"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_HELP_INFO = exports.DEPLOY_HELP_INFO = exports.COMPONENT_HELP_INFO = void 0;
exports.COMPONENT_HELP_INFO = [
    {
        header: 'fc-base component',
        content: 'You can use the component to deploy/remove your alicloud function computer resources.',
    },
    {
        header: 'Synopsis',
        content: '$ fc-base <command> <options>',
    },
    {
        header: 'Command List',
        content: [
            { name: 'help', summary: 'Display help information.' },
            { name: 'deploy', summary: 'Deploy alicloud function computer resources.' },
            { name: 'remove', summary: 'Remove alicloud function computer resources.' },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'assumeYes',
                description: 'Assume that the answer to any question which would be asked is yes.',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            '$ fc-base {bold deploy} {bold --assumeYes}',
            '$ fc-base {bold remove} {underline service}',
            '$ fc-base {bold help}',
        ],
    },
];
exports.DEPLOY_HELP_INFO = [
    {
        header: 'Remove resources',
        content: 'Deploy resources',
    },
    {
        header: 'Usage',
        content: '$ fc-base deploy',
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'assumeYes',
                description: 'Assume that the answer to any question which would be asked is yes.',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
];
exports.REMOVE_HELP_INFO = [
    {
        header: 'Remove resources',
        content: 'Specify RESOURCE to remove it and resource belonging to it.\n' +
            'If service is specified, service and its functions should be removed.\n' +
            'If function is specified, function and its triggers should be removed.\n' +
            'If trigger is specified, you can specify the trigger name to remove the specific trigger or remove all triggers without name.\n'
    },
    {
        header: 'Usage',
        content: '$ fc-base remove <RESOURCE> <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'name',
                description: 'Resource name to be removed, only for trigger/domain resource.',
                alias: '-n',
                type: String,
            },
            {
                name: 'help',
                description: 'Help for rm.',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'assumeYes',
                description: 'Assume that the answer to any question which would be asked is yes.',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            '$ remove {bold remove} {underline service}',
            '$ remove {bold remove} {underline function}',
            '$ remove {bold remove} {underline trigger} [{bold --name} {underline name}]',
            '$ remove {bold remove} {underline domain} [{bold --name} {underline name}]',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9zdGF0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ2EsUUFBQSxtQkFBbUIsR0FBRztJQUNqQztRQUNFLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsT0FBTyxFQUFFLHVGQUF1RjtLQUNqRztJQUNEO1FBQ0UsTUFBTSxFQUFFLFVBQVU7UUFDbEIsT0FBTyxFQUFFLCtCQUErQjtLQUN6QztJQUNEO1FBQ0UsTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRTtZQUN0RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLDhDQUE4QyxFQUFFO1lBQzNFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsOENBQThDLEVBQUU7U0FDNUU7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsV0FBVztnQkFDakIsV0FBVyxFQUFFLHFFQUFxRTtnQkFDbEYsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRTtZQUNQLDRDQUE0QztZQUM1Qyw2Q0FBNkM7WUFDN0MsdUJBQXVCO1NBQ3hCO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxnQkFBZ0IsR0FBRztJQUM5QjtRQUNFLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsT0FBTyxFQUFFLGtCQUFrQjtLQUM1QjtJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUsa0JBQWtCO0tBQzVCO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixXQUFXLEVBQUUscUVBQXFFO2dCQUNsRixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLGdCQUFnQixHQUFHO0lBQzlCO1FBQ0UsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixPQUFPLEVBQUUsK0RBQStEO1lBQzVFLHlFQUF5RTtZQUN6RSwwRUFBMEU7WUFDMUUsaUlBQWlJO0tBQUU7SUFDakk7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSx1Q0FBdUM7S0FDakQ7SUFDRDtRQUNFLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxnRUFBZ0U7Z0JBQzdFLEtBQUssRUFBRSxJQUFJO2dCQUNYLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsY0FBYztnQkFDM0IsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFdBQVcsRUFBRSxxRUFBcUU7Z0JBQ2xGLEtBQUssRUFBRSxHQUFHO2dCQUNWLElBQUksRUFBRSxPQUFPO2FBQ2Q7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsVUFBVTtRQUNsQixPQUFPLEVBQUU7WUFDUCw0Q0FBNEM7WUFDNUMsNkNBQTZDO1lBQzdDLDZFQUE2RTtZQUM3RSw0RUFBNEU7U0FDN0U7S0FDRjtDQUNGLENBQUMifQ==