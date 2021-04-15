
export const COMPONENT_HELP_INFO = [
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

export const DEPLOY_HELP_INFO = [
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

export const REMOVE_HELP_INFO = [
  {
    header: 'Remove resources',
    content: 'Specify RESOURCE to remove it and resource belonging to it.\n' +
'If service is specified, service and its functions should be removed.\n' +
'If function is specified, function and its triggers should be removed.\n' +
'If trigger is specified, you can specify the trigger name to remove the specific trigger or remove all triggers without name.\n' },
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
