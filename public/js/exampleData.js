
let classes = {
    'App/Models/Worker': {
        properties: {
            'name': {
                name: 'name',
                scope: 'private',
                type: 'string',
            },
        },
        methods: {
            'getName': {
                name: 'getName',
                scope: 'public',
                type: 'string',
            },
        },
        dependencies: [],
    },
    'App/Models/Project': {
        properties: {
            'name': {
                name: 'name',
                scope: 'private',
                type: 'string',
            },
            'subProject': {
                name: 'subProject',
                scope: 'private',
                type: 'App/Models/Project',
            },
            'manager': {
                name: 'manager',
                scope: 'private',
                type: 'App/Models/Worker',
            },
        },
        methods: {
            'getName': {
                name: 'getName',
                scope: 'public',
                type: 'string',
            },
            'getManager': {
                name: 'getManager',
                scope: 'public',
                type: 'App/Models/Worker',
            },
            'getManagerName': {
                name: 'getManagerName',
                scope: 'public',
                type: 'string',
            },
        },
        dependencies: [
            {
                fromClass: 'App/Models/Project',
                fromProperty: 'manager',
                toClass: 'App/Models/Worker',
                type: 'aggregation',
            },
            {
                fromClass: 'App/Models/Project',
                formMethod: 'getManager',
                toClass: 'App/Models/Worker',
                type: 'association',
            },
            {
                fromClass: 'App/Models/Project',
                formMethod: 'getManagerName',
                toClass: 'App/Models/Worker',
                toMethod: 'getName',
                type: 'association',
            },
            {
                fromClass: 'App/Models/Project',
                fromProperty: 'subProject',
                toClass: 'App/Models/Project',
                type: 'association',
            },
        ],
    },
    'TicTack/Class0': {
        properties: {},
        methods: {},
        dependencies: [],
    },
    'TicTack/ComponentA/Class1': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/ComponentA/Class1',
                toClass: 'TicTack/Class0',
                type: 'inheritance',
            },
        ],
    },
    'TicTack/ComponentB/Class2': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/ComponentB/Class2',
                toClass: 'TicTack/ComponentA/Class1',
                type: 'inheritance',
            },
        ],
    },
    'TicTack/ComponentA/Class3': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/ComponentA/Class3',
                toClass: 'TicTack/ComponentB/Class2',
                type: 'inheritance',
            },
        ],
    },
    'TicTack/ComponentB/Class4': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/ComponentB/Class4',
                toClass: 'TicTack/ComponentA/Class3',
                type: 'inheritance',
            },
        ],
    },
    'TicTack/ComponentA/Class5': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/ComponentA/Class5',
                toClass: 'TicTack/ComponentB/Class4',
                type: 'inheritance',
            },
        ],
    },
    'TicTack/Class6': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/Class6',
                toClass: 'TicTack/ComponentA/Class5',
                type: 'inheritance',
            },
        ],
    },
};
