// Get available nodes for current rule chain, excluding current node
function loadSelectNodes(lf, currentNodeModel, field, query) {
  let options = [];
  try {
    let ruleChainDSL = lf.getGraphData();
    ruleChainDSL?.metadata?.nodes.forEach((item) => {
      if (item.id && item.id !== currentNodeModel.id) {
        options.push({ value: item.id, label: item.name });
      }
    });
  } catch (e) {
  } finally {
    field.component.options = options;
  }
  return options;
}

export const locales = {
  category: {
    endpoints: {
      label: 'Input Terminal',
      // background:'#E6E0F8FF',
      background: '#A6BBCFFF',
      nodeType: 'endpoint-node',
    },
    filter: {
      label: 'Filter',
      // background:'#E2D96EFF',
      background: '#f1e861',
      nodeType: 'simple-node',
    },
    transform: {
      label: 'Converter',
      // background:'#FDD0A2FF',
      background: '#79cef1',
      nodeType: 'simple-node',
    },
    action: {
      label: 'Action',
      // background:'#f1c84e',
      background: '#f1928f',
      nodeType: 'simple-node',
    },
    external: {
      label: 'External',
      // background:'#E6E0F8FF',
      background: '#fbc766',
      nodeType: 'simple-node',
    },
    ai: {
      label: 'AI',
      background: '#7cbaf8',
      nodeType: 'simple-node',
    },
    ci: {
      label: 'CI/CD',
      background: '#9ec9c9',
      nodeType: 'simple-node',
    },
    iot: {
      label: 'IoT',
      background: '#FFA500',
      nodeType: 'simple-node',
    },
    flow: {
      label: 'Sub-Rule Chain',
      // background:'#E6E0F8FF',
      background: '#E6E0F8FF',
      nodeType: 'simple-node',
    },
  },
  component: {
    endpoints: {
      'endpoint/beanstalkdTubeset': {
        notInput: true,
        label: 'Beanstalkd',
        icon: '/images/endpoint/beanstalkd.svg',
        desc: '<ul><li>Beanstalkd subscription endpoint</li><li>Connect to Beanstalkd server, subscribe to messages, get messages and pass to next node for processing,</li><a href="https://rulego.cc/pages/endpoint-beanstalkd" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Beanstalkd server address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: 127.0.0.1:11300. When multiple nodes modify message state in workflow, use connection pooling (ref://)',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        tubesets: {
          label: 'Tube List',
          desc: '',
          rules: [{ required: true, message: 'This field is required' }],
        },
        timeout: {
          label: 'Subscribe Job timeout in seconds',
          desc: '',
        },
        router: {
          hide: true,
        },
      },
      'endpoint/mqtt': {
        notInput: true,
        label: 'MQTT',
        icon: '/images/endpoint/mqtt.svg',
        desc: '<ul><li>MQTT subscription endpoint</li><li>Connect to MQTT server, trigger rule chain by subscribing to routed topics</li><a href="https://rulego.cc/pages/2b0760/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'MQTT server address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: '',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        username: {
          label: 'Username',
          desc: '',
        },
        password: {
          label: 'Password',
          desc: '',
        },
        maxReconnectInterval: {
          label: 'Reconnection Interval (seconds)',
          desc: '',
        },
        qOS: {
          label: 'QOS',
          desc: '',
        },
        router: {
          from: {
            path: {
              label: 'Subscribe Topic',
              rules: [{ required: true, message: 'This field is required' }],
              desc: 'Triggered when subscribing to topic, e.g.: devices/msg',
            },
          },
        },
      },
      'endpoint/net': {
        notInput: true,
        label: 'TCP/UDP',
        icon: '/images/endpoint/net.svg',
        desc: '<ul><li>TCP/UDP server endpoint.</li><li>Start TCP/UDP server, trigger rule chain by routing data via regex.</li><a href="https://rulego.cc/pages/b7050c/" target="_blank">Help documentation</a></ul>',
        protocol: {
          label: 'Protocol',
          desc: 'tcp/udp',
          rules: [{ required: true, message: 'Protocol is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: false,
            multiple: false,
            options: [
              {
                label: 'TCP',
                value: 'tcp',
              },
              {
                label: 'UDP',
                value: 'udp',
              },
            ],
          },
        },
        server: {
          label: 'Listen Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: :6335',
        },
        readTimeout: {
          label: 'Read timeout (seconds)',
          desc: '',
        },
        encode: {
          label: 'Encoding',
          desc: 'Convert byte stream to hex/base64. Default: no conversion',
          rules: [],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: false,
            multiple: false,
            clearable: true,
            options: [
              {
                label: 'None',
                value: 'none',
              },
              {
                label: 'hex',
                value: 'hex',
              },
              {
                label: 'base64',
                value: 'base64',
              },
            ],
          },
        },
        router: {
          from: {
            path: {
              label: 'Route Regex Expression',
              rules: [{ required: true, message: 'This field is required' }],
              desc: 'Trigger via regex match of qualifying data. * matches all',
            },
          },
        },
      },
      'endpoint/http': {
        notInput: true,
        label: 'HTTP',
        icon: '/images/endpoint/http.svg',
        desc: '<ul><li>HTTP server endpoint.</li><li>Start HTTP server, handle routed URL requests, route request data to rule chain.</li><a href="https://rulego.cc/pages/691dd3/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Listen Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: :6335',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        allowCors: {
          label: 'Allow CORS',
        },
        certFile: {
          label: 'Certificate File Path',
          desc: 'HTTPS Usage',
        },
        certKeyFile: {
          label: 'Key File Path',
          desc: 'HTTPS Usage',
        },
        router: {
          from: {
            path: {
              label: 'Path',
              rules: [{ required: true, message: 'This field is required' }],
              desc: 'Triggered when client requests URL, e.g.: /api/v1/msg',
            },
          },
        },
      },
      'endpoint/ws': {
        notInput: true,
        label: 'Websocket',
        icon: '/images/endpoint/websocket.svg',
        desc: '<ul><li>WebsocketServer endpoint.</li><li>Start WebSocket server, handle routed URL requests, route request data to rule chain.</li><a href="https://rulego.cc/pages/e36f41/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Listen Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: :6335',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        allowCors: {
          label: 'Allow CORS',
        },
        certFile: {
          label: 'Certificate File Path',
          desc: 'HTTPS Usage',
        },
        certKeyFile: {
          label: 'Key File Path',
          desc: 'HTTPS Usage',
        },
        router: {
          from: {
            path: {
              label: 'Path',
              rules: [{ required: true, message: 'This field is required' }],
              desc: 'Triggered when client requests URL, e.g.: /api/ms/ws ',
            },
          },
        },
      },
      'endpoint/schedule': {
        notInput: true,
        label: 'Scheduled Task',
        icon: '/images/endpoint/schedule.svg',
        desc: '<ul><li>Scheduled TaskEndpoint</li><li>Trigger rule chain periodically via routed Cron expression</li><a href="https://rulego.cc/pages/4c4e4c/" target="_blank">Help documentation</a></ul>',
        router: {
          from: {
            path: {
              label: 'Cron Expression',
              rules: [
                {
                  required: true,
                  message: 'Please enter cron expression, e.g.: */10 * * * * *',
                },
              ],
              desc: 'Trigger periodically via cron expression, e.g.: */10 * * * * *',
            },
            processors: {
              hide: true,
            },
          },
          to: {
            processors: {
              hide: true,
            },
          },
        },
      },
      'endpoint/kafka': {
        notInput: true,
        label: 'Kafka',
        icon: '/images/endpoint/kafka.svg',
        desc: '<ul><li>KafkaSubscription endpoint</li><li>Connect to Kafka server, trigger rule chain by subscribing to routed topics</li><a href="https://rulego.cc/pages/07ad50/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Kafka server address',
          desc: 'Multiple addresses separated by comma, e.g.: 127.0.0.1:9092,127.0.0.2:9092',
          rules: [{ required: true, message: 'Server address is required' }],
        },
        groupId: {
          label: 'Consumer Group ID',
          desc: 'Default rulego',
        },
        router: {
          from: {
            path: {
              label: 'Subscribe Topic',
              rules: [{ required: true, message: 'This field is required' }],
              desc: 'Triggered when subscribing to topic, e.g.: devices/msg',
            },
          },
        },
      },
      'endpoint/nats': {
        notInput: true,
        label: 'Nats',
        icon: '/images/endpoint/nats.svg',
        desc: '<ul><li>NatsSubscription endpoint</li><li>Connect to Nats server, trigger rule chain by subscribing to routed topics</li><a href="https://rulego.cc/pages/0a7ad4/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'NATS Service Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: nats://127.0.0.1:4222',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        username: {
          label: 'Username',
          desc: '',
        },
        password: {
          label: 'Password',
          desc: '',
        },
        router: {
          from: {
            path: {
              label: 'Subscribe Topic',
              rules: [{ required: true, message: 'This field is required' }],
              desc: 'Triggered when subscribing to topic, e.g.: devices/msg',
            },
          },
        },
      },
      'endpoint/redis': {
        notInput: true,
        label: 'Redis',
        icon: '/images/endpoint/redis.svg',
        desc: '<ul><li>RedisSubscription endpoint</li><li>Connect to Redis server, trigger rule chain by subscribing to routed channels</li><a href="https://rulego.cc/pages/c96eb4/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Redis service address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: 127.0.0.1:6379',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        password: {
          label: 'Password',
          desc: '',
        },
        db: {
          label: 'Database Number',
          rules: [
            { required: true, message: 'This field is required' },
            { type: 'integer', required: true, message: 'Must be integer type' },
          ],
          desc: 'Default 0',
        },
        router: {
          from: {
            path: {
              label: 'Subscribe Redis channel',
              rules: [{ required: true, message: 'This field is required' }],
              desc: 'Multiple channels separated by comma, e.g.: devices/msg,devices/msg2',
            },
          },
        },
      },
      'endpoint/redis/stream': {
        notInput: true,
        label: 'Redis Stream',
        icon: '/images/endpoint/redis_stream.svg',
        desc: '<ul><li>Redis SteamEndpoint</li><li>Connect to Redis server, trigger rule chain by subscribing to routed stream names</li><a href="https://rulego.cc/pages/c96eb5/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Redis service address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: 127.0.0.1:6379',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        password: {
          label: 'Password',
          desc: '',
        },
        db: {
          label: 'Database Number',
          rules: [
            { required: true, message: 'This field is required' },
            { type: 'integer', required: true, message: 'Must be integer type' },
          ],
          desc: 'Default 0',
        },
        groupId: {
          label: 'Consumer Group ID',
          desc: 'Default rulego',
        },
        router: {
          from: {
            path: {
              label: 'Subscribe Stream Name',
              rules: [{ required: true, message: 'This field is required' }],
              desc: 'Multiple streams separated by comma, e.g.: devices/msg,devices/msg2',
            },
          },
        },
      },
      'endpoint/rabbitmq': {
        notInput: true,
        label: 'RabbitMQ',
        icon: '/images/endpoint/rabbitmq.svg',
        desc: '<ul><li>rabbitmqSubscription endpoint</li><li>Supports AMQP protocol</li><li>Connect to RabbitMQ server, trigger rule chain by subscribing to routed route keys</li><li>Auto-declare exchange if it does not exist</li><a href="https://rulego.cc/pages/endpoint-rabbitmq/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Service Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Format: amqp://[username:password]@host/[vhost]',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        exchange: {
          label: 'Switch Name',
          desc: '',
        },
        exchangeType: {
          label: 'Switch Type',
          desc: 'direct/fanout/headers/topic',
        },
        durable: {
          label: 'Persist',
          desc: '',
        },
        autoDelete: {
          label: 'Auto-delete',
          desc: '',
        },
        router: {
          from: {
            path: {
              label: 'Route Key',
              rules: [{ required: true, message: 'This field is required' }],
              desc: '',
            },
          },
        },
      },
      'endpoint/mysql_cdc': {
        notInput: true,
        label: 'MYSQL CDC',
        icon: '/images/endpoint/mysql_cdc.svg',
        desc: '<ul><li>Triggered when MySQL table data changes.</li></li><a href="https://rulego.cc/pages/mysql-cdc/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'MySQL Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: 127.0.0.1:3306',
        },
        user: {
          label: 'Username',
        },
        password: {
          label: 'Password',
          desc: '',
        },
        fromOldest: {
          label: 'Full synchronization',
          desc: 'When enabled, syncs from first row on service restart. Otherwise syncs incremental data only',
        },
        dbs: {
          label: 'Monitor database. If empty, includes all tables',
          desc: 'e.g.: test',
        },
        includeTables: {
          label: 'Include table name. If empty, includes all tables',
          desc: 'e.g.: test.users，supports regex, e.g.: .*\\.canal or test.*',
        },
        excludeTables: {
          label: 'Exclude Table Name',
          desc: 'E.g.: mysql.component, supports regex, e.g.: mysql\\..*',
        },
        executionPath: {
          label: 'mysqldump execution path',
          desc: 'Example: mysqldump or /usr/bin/mysqldump',
        },
        charset: {
          label: 'Character Set',
          desc: 'e.g.: utf8',
        },
        flavor: {
          label: 'Database Type',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'mysql',
                value: 'mysql',
              },
              {
                label: 'mariadb',
                value: 'mariadb',
              },
            ],
          },
        },
        heartbeat: {
          label: 'Heartbeat time in seconds',
        },
        readTimeout: {
          label: 'Read Timeout (seconds)',
        },
        limit: {
          label: 'Limit sync record count',
          desc: 'For batch operations. Skips data exceeding limit. 0: unlimited. Other values: skips if exceeded',
        },
        router: {
          from: {
            path: {
              label: 'Route Table Name',
              rules: [{ required: true, message: 'This field is required' }],
              desc: 'Route by table name. Format: dbName.tableName, e.g.: test.users. * matches all tables',
            },
            processors: {
              hide: true,
            },
          },
          to: {
            processors: {
              hide: true,
            },
          },
        },
      },
      'endpoint/opcua': {
        category: 'iot',
        notInput: true,
        nodeType: 'endpoint-node',
        label: 'OPC_UA subscription',
        icon: '/images/endpoint/opcua.svg',
        desc: '<ul><li>Periodically read data from OPCUA server.</li><a href="https://rulego.cc/pages/endpoint-opcua/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Server Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: opc.tcp://localhost:4840',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        interval: {
          label: 'Read Task Time Configuration',
          desc: 'Example: @every 1m (every 1 minute) 0 0 0 * * * (triggers at midnight)',
          rules: [{ required: true, message: 'This field is required' }],
        },
        nodeIds: {
          label: 'Node ID List',
          desc: 'Example: ns=3;i=1003',
          rules: [{ required: true, message: 'This field is required' }],
        },
        auth: {
          label: 'Authorization Method',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Anonymous',
                value: 'anonymous',
              },
              {
                label: 'Username',
                value: 'username',
              },
              {
                label: 'Certificate',
                value: 'certificate',
              },
            ],
          },
        },
        username: {
          label: 'Username',
          desc: 'If authorization is username, must be filled',
        },
        password: {
          label: 'Password',
          desc: 'If authorization is username, must be filled',
        },
        certFile: {
          label: 'Certificate File Path',
          desc: 'If authorization is certificate, must be filled',
        },
        certKeyFile: {
          label: 'Key File Path',
          desc: 'If authorization is certificate, must be filled',
        },
        mode: {
          label: 'Mode',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Auto',
                value: 'auto',
              },
              {
                label: 'None',
                value: 'none',
              },
              {
                label: 'Sign',
                value: 'sign',
              },
              {
                label: 'Signandencrypt',
                value: 'signandencrypt',
              },
            ],
          },
        },
        policy: {
          label: 'Policy',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Auto',
                value: 'auto',
              },
              {
                label: 'None',
                value: 'none',
              },
              {
                label: 'Basic128Rsa15',
                value: 'Basic128Rsa15',
              },
              {
                label: 'Basic256',
                value: 'Basic256',
              },
              {
                label: 'Basic256Sha256',
                value: 'Basic256Sha256',
              },
              {
                label: 'Aes128_Sha256_RsaOaep',
                value: 'Aes128_Sha256_RsaOaep',
              },
              {
                label: 'Aes256_Sha256_RsaPss',
                value: 'Aes256_Sha256_RsaPss',
              },
            ],
          },
        },
        router: {
          hide: true,
        },
      },
      'endpoint/grpc/stream': {
        label: 'gRPC stream client',
        icon: '/images/grpc.svg',
        desc: '<ul><li>Receive gRPC server push data and forward to rule chain for processing</li></ul><a href="https://rulego.cc/pages/endpoint-grpc-stream/" target="_blank">Help documentation</a>',
        server: {
          label: 'gRPC Service Address',
          desc: 'Format: hostname:port',
          rules: [{ required: true, message: 'Service Address is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        service: {
          label: 'Service Name',
          desc: 'Example: helloworld.Greeter',
          rules: [{ required: true, message: 'Service Name is required' }],
        },
        method: {
          label: 'Method Name',
          desc: 'Example: SayHello',
          rules: [{ required: true, message: 'Method Name is required' }],
        },
        request: {
          label: 'Request parameter content (can be empty)',
          desc: 'Example: {"name":"lala"}',
          component: {
            type: 'textarea',
          },
        },
        headers: {
          label: 'Request Header',
          desc: '',
        },
        checkInterval: {
          label: 'Service check interval in milliseconds',
          desc: '',
        },
        router: {
          hide: true,
        },
      },
      'endpoint/wukongim': {
        label: 'WuKongIM receive',
        icon: '/images/endpoint/wukongim.svg',
        desc: '<ul><li>Receive WuKongIM push data and forward to rule chain for processing</li></ul><a href="https://rulego.cc/pages/endpoint-wukongim/" target="_blank">Help documentation</a>',
        server: {
          label: 'Server Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: tcp://175.27.245.108:15100',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        uID: {
          label: 'User ID',
          rules: [{ required: true, message: 'This field is required' }],
        },
        token: {
          label: 'Login Password',
          desc: '',
        },
        connectTimeout: {
          label: 'Connection Timeout (seconds)',
          desc: '',
        },
        protoVersion: {
          label: 'Protocol Version',
          desc: 'Example: 3',
        },
        pingInterval: {
          label: 'Heartbeat interval in seconds',
          desc: 'Example: 30',
        },
        reconnect: {
          label: 'Auto-reconnect',
          desc: '',
        },
        autoAck: {
          label: 'Auto-acknowledge messages',
          desc: '',
        },
        router: {
          hide: true,
        },
      },
    },
    nodes: {
      comment: {
        notInput: true,
        notOutput: true,
        label: 'Comment',
        icon: '/images/comment.svg',
        desc: 'Display node name as annotation on canvas',
        nodeType: 'comment-node',
      },
      delay: {
        label: 'Delay',
        icon: '/images/delay.svg',
        desc: '<a href="https://rulego.cc/pages/5f5612/" target="_blank">Help documentation</a>',
        periodInSeconds: {
          label: 'Delay Time (seconds)',
          desc: '',
        },
        maxPendingMsgs: {
          label: 'Maximum number of suspended messages allowed',
          desc: 'If overwrite mode is enabled, this parameter is ineffective',
        },
        periodInSecondsPattern: {
          label: 'Delay time expression (seconds)',
          desc: 'Retrieve via ${metadata.key} from metadata variables or ${msg.key} from message payload. Delay time - if set, takes priority',
        },
        overwrite: {
          label: 'Overwrite Mode',
          desc: 'If enabled, only one message can be suspended per period. New messages override previous ones',
        },
      },
      log: {
        label: 'Log',
        icon: '/images/log.svg',
        desc: '<a href="https://rulego.cc/pages/020050/" target="_blank">Help documentation</a>',
        jsScript: {
          label: 'function String(msg, metadata, msgType) {',
          desc: '}',
        },
      },
      for: {
        label: 'for',
        icon: '/images/for.svg',
        desc: '<a href="https://rulego.cc/pages/7db1de/" target="_blank">Help documentation</a>',
        range: {
          label: 'Iteration Value Expression',
          desc: 'Example: msg.items;1..3. If empty, traverses entire message',
        },
        do: {
          label: 'Handler Node ID',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Start node ID of processing chain',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: false,
            multiple: false,
            loadData: loadSelectNodes,
          },
        },
        mode: {
          label: 'Execution Mode',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Sync without merging execution results',
                value: 0,
              },
              {
                label: 'Synchronous Merge Execution Result',
                value: 1,
              },
              {
                label: 'Synchronous Overwrite Execution Result',
                value: 2,
              },
              {
                label: 'Async without merging execution results',
                value: 3,
              },
            ],
          },
        },
        // nodeType: 'group-node',
      },
      functions: {
        label: 'Function',
        desc: '<a href="https://rulego.cc/pages/b7edde/" target="_blank">Help documentation</a>',
        functionName: {
          label: 'Function Name',
          rules: [{ required: true, message: 'This field is required' }],
          desc: '',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            placeholder: 'Please select or enter function name',
          },
        },
      },
      'x/beanstalkdWorker': {
        label: 'Beanstalkd Worker',
        icon: '/images/beanstalkd_worker.svg',
        category: 'external',
        desc: '<ul><li>BeanstalkdConsumer, supports the following operations: Delete, Release, Bury, KickJob, Touch, Peek, ReserveJob, StatsJob, Stats, ListTubes.</li><a href="https://rulego.cc/pages/x-beanstalkd-worker/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Beanstalkd server address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: 127.0.0.1:11300. When multiple nodes modify message state in workflow, use connection pooling (ref://)',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        tube: {
          label: 'Tube Name',
          desc: 'Tube name. Supports ${} placeholder variables',
          rules: [{ required: true, message: 'This field is required' }],
        },
        cmd: {
          label: 'Command Name',
          desc: 'Command name, supports Delete Release Bury KickJob Touch Peek ReserveJob StatsJob Stats ListTubes',
          rules: [{ required: true, message: 'This field is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Delete',
                value: 'Delete',
              },
              {
                label: 'Release',
                value: 'Release',
              },
              {
                label: 'Bury',
                value: 'Bury',
              },
              {
                label: 'KickJob',
                value: 'KickJob',
              },
              {
                label: 'Touch',
                value: 'Touch',
              },
              {
                label: 'Peek',
                value: 'Peek',
              },
              {
                label: 'ReserveJob',
                value: 'ReserveJob',
              },
              {
                label: 'StatsJob',
                value: 'StatsJob',
              },
              {
                label: 'Stats',
                value: 'Stats',
              },
              {
                label: 'ListTubes',
                value: 'ListTubes',
              },
            ],
          },
        },
        jobId: {
          label: 'JobId',
          desc: 'JobId is optional based on command, supports ${} placeholder variables. Parameters for Delete, Release, Bury, KickJob, Touch, Peek, ReserveJob, StatsJob commands',
        },
        pri: {
          label: 'Priority',
          desc: 'Priority: pri supports ${} placeholder variables. Parameters for Release, Bury commands',
        },
        delay: {
          label: 'Delay Duration',
          desc: 'Delay Duration: delay Supports ${} placeholder variables,Release command parameter, format e.g.: "30s", "5m"',
        },
      },
      'x/beanstalkdTube': {
        label: 'Beanstalkd Tube',
        icon: '/images/beanstalkd_tube.svg',
        category: 'external',
        desc: '<ul><li>Beanstalkd Tube, supports the following operations: Put, PeekReady, PeekDelayed, PeekBuried, Kick, Stat, Pause.</li><a href="https://rulego.cc/pages/x-beanstalkd-tube/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Beanstalkd server address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: 127.0.0.1:11300. When multiple nodes modify message state in workflow, use connection pooling (ref://)',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        tube: {
          label: 'Tube Name',
          desc: 'Tube name. Supports ${} placeholder variables',
          rules: [{ required: true, message: 'This field is required' }],
        },
        cmd: {
          label: 'Command Name',
          desc: 'Command name, supports Put, PeekReady, PeekDelayed, PeekBuried, Kick, Stat, Pause',
          rules: [{ required: true, message: 'This field is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Put',
                value: 'Put',
              },
              {
                label: 'PeekReady',
                value: 'PeekReady',
              },
              {
                label: 'PeekDelayed',
                value: 'PeekDelayed',
              },
              {
                label: 'PeekBuried',
                value: 'PeekBuried',
              },
              {
                label: 'Kick',
                value: 'Kick',
              },
              {
                label: 'Stat',
                value: 'Stat',
              },
              {
                label: 'Pause',
                value: 'Pause',
              },
            ],
          },
        },
        body: {
          label: 'body',
          desc: 'body is optional based on command. Supports ${} placeholder variables. Put command parameter',
        },
        pri: {
          label: 'Priority',
          desc: 'Priority: pri supports ${} placeholder variables. Put command parameter',
        },
        delay: {
          label: 'Delay Duration',
          desc: 'Delay Duration: delay Supports ${} placeholder variables,Put command parameter, format e.g.: "30s", "5m"',
        },
        ttr: {
          label: 'Job maximum execution seconds',
          desc: 'Max execution seconds: ttr supports ${} placeholder variables. Put command parameter',
        },
        kickBound: {
          label: 'Maximum number of jobs to wake',
          desc: 'Kick command parameter bound supports ${} placeholder variables',
        },
        pauseTime: {
          label: 'Pause Duration',
          desc: 'Pause command parameter timeout. Supports ${} placeholder variables, format e.g.: "30s", "5m"',
        },
      },
      dbClient: {
        label: 'Database',
        icon: '/images/db.svg',
        desc: '<a href="https://rulego.cc/pages/32683d/" target="_blank">Help documentation</a>',
        sql: {
          label: 'SQL Statement',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Use ${metadata.key} or ${msg.key} variables. SQL parameters support ? placeholder',
          component: {
            type: 'textarea',
            rows: 4,
          },
        },
        params: {
          label: 'Placeholder Parameter List',
          desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
        },
        getOne: {
          label: 'Return single record',
          desc: '',
        },
        poolSize: {
          label: 'Connection Pool Size',
          desc: '',
        },
        driverName: {
          label: 'Database Driver Name',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'mysql or postgres. Other database types require corresponding driver import',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'mysql',
                value: 'mysql',
              },
              {
                label: 'postgres',
                value: 'postgres',
              },
            ],
          },
        },
        dsn: {
          label: 'Database Connection',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'MySQL configuration example: username:password@tcp(127.0.0.1:3306)/db Postgres configuration example: postgres://username:password@127.0.0.1:5432/db?sslmode=disable',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
      },
      mqttClient: {
        label: 'MQTT',
        icon: '/images/mqtt.svg',
        desc: '<a href="https://rulego.cc/pages/44aa9a/" target="_blank">Help documentation</a>',
        topic: {
          label: 'Publish Topic',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
        },
        server: {
          label: 'MQTT server address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: 127.0.0.1:1883. Allows selecting connection pool',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        username: {
          label: 'Username',
          desc: '',
        },
        password: {
          label: 'Password',
          desc: '',
        },
        maxReconnectInterval: {
          label: 'Reconnection Interval (seconds)',
          desc: '',
        },
        qOS: {
          label: 'QoS',
          desc: '',
        },
        clientID: {
          label: 'Client ID',
          desc: '',
        },
        cleanSession: {
          label: 'Clear Session',
          desc: '',
        },
        cAFile: {
          label: 'Certificate Authority (CA) file',
          desc: '',
        },
        certFile: {
          label: 'Certificate File',
          desc: '',
        },
        certKeyFile: {
          label: 'Certificate Key File',
          desc: '',
        },
      },
      restApiCall: {
        label: 'REST',
        icon: '/images/rest.svg',
        desc: '<a href="https://rulego.cc/pages/f3a3d5/" target="_blank">Help documentation</a>',
        restEndpointUrlPattern: {
          label: 'HTTP URL address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
        },
        requestMethod: {
          label: 'Request Method',
          rules: [{ required: true, message: 'This field is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: false,
            multiple: false,
            options: [
              {
                label: 'POST',
                value: 'POST',
              },
              {
                label: 'GET',
                value: 'GET',
              },
              {
                label: 'DELETE',
                value: 'DELETE',
              },
              {
                label: 'PUT',
                value: 'PUT',
              },
              {
                label: 'PATCH',
                value: 'PATCH',
              },
              {
                label: 'HEAD',
                value: 'HEAD',
              },
            ],
          },
          desc: 'POST/GET/DELETE/PUT/PATCH/HEAD',
        },
        withoutRequestBody: {
          label: 'Do not transmit request body',
          desc: 'Do not transmit message payload to configured service address',
        },
        headers: {
          label: 'Request Header',
          desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
        },
        readTimeoutMs: {
          label: 'Timeout in milliseconds. Default: 0',
          desc: '0 means no timeout',
        },
        insecureSkipVerify: {
          label: 'Disable certificate verification',
          desc: 'Self-signed certificate requires disabling certificate verification',
        },
        maxParallelRequestsCount: {
          label: 'Max concurrent size',
          desc: '0 means no limit',
        },
        enableProxy: {
          label: 'Enable Proxy',
          desc: '',
        },
        useSystemProxyProperties: {
          label: 'Use System Proxy Configuration',
          desc: '',
        },
        proxyScheme: {
          label: 'Proxy Protocol',
          desc: '',
        },
        proxyHost: {
          label: 'Proxy Host',
          desc: '',
        },
        proxyPort: {
          label: 'Proxy Port',
          desc: '',
        },
        proxyUser: {
          label: 'Username',
          desc: '',
        },
        proxyPassword: {
          label: 'Password',
          desc: '',
        },
      },
      sendEmail: {
        label: 'Send Email',
        icon: '/images/email.svg',
        desc: '<a href="https://rulego.cc/pages/70c37d/" target="_blank">Help documentation</a>',
        smtpHost: {
          label: 'SMTP host address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: '',
        },
        smtpPort: {
          label: 'SMTP host port',
          rules: [{ required: true, message: 'This field is required' }],
          desc: '',
        },
        username: {
          label: 'Username',
          rules: [{ required: true, message: 'This field is required' }],
          desc: '',
        },
        password: {
          label: 'Authorization Code',
          rules: [{ required: true, message: 'This field is required' }],
          desc: '',
        },
        enableTls: {
          label: 'Enable TLS',
          desc: '',
        },
        email: {
          label: 'Email Content',
          desc: '',
          from: {
            label: 'Sender Email',
            desc: 'Multiple separated by comma',
          },
          to: {
            label: 'Recipient Email',
            desc: 'Multiple separated by comma',
          },
          cc: {
            label: 'CC Email',
            desc: 'Multiple separated by comma',
          },
          bcc: {
            label: 'BCC Email',
            desc: 'Multiple separated by comma',
          },
          subject: {
            label: 'Email Subject',
            desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
          },
          body: {
            label: 'Email Content',
            desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
          },
        },
        connectTimeout: {
          label: 'Connection timeout in seconds. Default: 10',
          desc: '',
        },
      },
      ssh: {
        label: 'SSH',
        icon: '/images/ssh.svg',
        desc: '<a href="https://rulego.cc/pages/fa62c1/" target="_blank">Help documentation</a>',
        host: {
          label: 'SSH Host Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: '',
        },
        port: {
          label: 'SSH Host Port',
          rules: [{ required: true, message: 'This field is required' }],
          desc: '',
        },
        username: {
          label: 'SSH login username',
          desc: '',
        },
        password: {
          label: 'SSH Login Password',
          desc: '',
        },
        cmd: {
          label: 'Shell Command',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
        },
      },
      fieldFilter: {
        label: 'Field Filter',
        desc: '<a href="https://rulego.cc/pages/502031/" target="_blank">Help documentation</a>',
        checkAllKeys: {
          label: 'Whether all field keys must exist',
          desc: '',
        },
        dataNames: {
          label: 'Message data field key',
          desc: 'Multiple separated by comma',
        },
        metadataNames: {
          label: 'Metadata field key',
          desc: 'Multiple separated by comma',
        },
      },
      jsFilter: {
        label: 'JS Filter',
        icon: '/images/jsFilter.svg',
        desc: '<a href="https://rulego.cc/pages/8269e5/" target="_blank">Help documentation</a>',
        jsScript: {
          label: 'function Filter(msg, metadata, msgType) {',
          desc: '}',
        },
      },
      jsSwitch: {
        label: 'JS Route',
        desc: '<a href="https://rulego.cc/pages/bd9a27/" target="_blank">Help documentation</a>',
        jsScript: {
          label: 'function Switch(msg, metadata, msgType) {',
          desc: '}',
        },
      },
      msgTypeSwitch: {
        label: 'Message Route',
        icon: '/images/msgTypeSwitch.svg',
        desc: '<a href="https://rulego.cc/pages/09b453/" target="_blank">Help documentation</a>',
      },
      exprFilter: {
        label: 'Expression Filter',
        icon: '/images/exp.svg',
        desc: '<ul><li>Use expr expression to filter messages</li><li>via`msg`VariableAccess message body. Example `msg.temperature`</li><li>via`metadata`VariableAccess message metadata. Example `metadata.customerName`</li><li>via`type`VariableAccess message type</li><li>via`dataType`VariableAccess data type</li><a href="https://rulego.cc/pages/c8fe75/" target="_blank">Help documentation</a></ul>',
        expr: {
          label: 'Filter Expression',
          desc: 'Example: msg.temperature>50. Return value must be boolean type',
          rules: [{ required: true, message: 'Filter expression is required' }],
        },
      },
      switch: {
        label: 'Conditional Branch',
        icon: '/images/msgTypeSwitch.svg',
        desc: '<a href="https://rulego.cc/pages/switch/" target="_blank">Help documentation</a>',
        cases: {
          label: 'Condition List',
          desc: 'Match conditions in sequence. If matched, executes subsequent nodes per route. If no match, executes default chain',
          component: {
            type: 'switchNode',
          },
        },
        relationTypeDynamics: true,
      },
      exprTransform: {
        label: 'Expression Transform',
        icon: '/images/exp.svg',
        desc: '<ul><li>Use expr expression to transform or create new msg</li><li>via`msg`VariableAccess message body. Example `msg.temperature`</li><li>via`metadata`VariableAccess message metadata. Example `metadata.customerName`</li><li>via`type`VariableAccess message type</li><li>via`dataType`VariableAccess data type</li><a href="https://rulego.cc/pages/3769cc/" target="_blank">Help documentation</a></ul>',
        expr: {
          label: 'Transform Expression',
          desc: 'Example: msg.name. If field has value, takes priority',
        },
        mapping: {
          label: 'Field-expression mapping list (creates new message)',
          desc: 'Key: field name, Value: expression. If field has value, creates new message based on field and conversion expression',
        },
      },
      metadataTransform: {
        label: 'Metadata Transform',
        icon: '/images/metadata.svg',
        desc: '<ul><li>Use expr expression to transform or create new metadata</li><li>via`msg`VariableAccess message body. Example `msg.temperature`</li><li>via`metadata`VariableAccess message metadata. Example `metadata.customerName`</li><li>via`type`VariableAccess message type</li><li>via`dataType`VariableAccess data type</li><a href="https://rulego.cc/pages/316efe/" target="_blank">Help documentation</a></ul>',
        mapping: {
          label: 'Field-expression mapping list',
          desc: "Key:Field name, value: transform expression. If not an expression, use single quotes, e.g.:'xx'",
        },
        isNew: {
          label: 'Whether to create new metadata list',
          desc: 'true: creates new metadata list. false: updates corresponding metadata key',
        },
      },
      jsTransform: {
        label: 'JS Transform',
        desc: '<a href="https://rulego.cc/pages/794696/" target="_blank">Help documentation</a>',
        jsScript: {
          label: 'function Transform(msg, metadata, msgType) {',
          desc: '}',
        },
      },
      net: {
        label: 'TCP/UDP',
        icon: '/images/net.svg',
        desc: '<a href="https://rulego.cc/pages/c1af87/" target="_blank">Help documentation</a>',
        protocol: {
          label: 'Protocol',
          desc: 'tcp/udp',
          rules: [{ required: true, message: 'Protocol is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: false,
            multiple: false,
            options: [
              {
                label: 'TCP',
                value: 'tcp',
              },
              {
                label: 'UDP',
                value: 'udp',
              },
            ],
          },
        },
        server: {
          label: 'Service Address',
          rules: [{ required: true, message: 'Service Address is required' }],
          desc: 'Example: 127.0.0.1:6335',
        },
        connectTimeout: {
          label: 'Connection timeout in seconds. Default: 60',
        },
        heartbeatInterval: {
          label: 'Heartbeat interval in seconds. 0: no heartbeat',
        },
      },
      flow: {
        label: 'Sub-Rule Chain',
        desc: '<a href="https://rulego.cc/pages/e27cec/" target="_blank">Help documentation</a>',
        targetId: {
          label: 'Sub-Rule Chain ID',
          desc: '',
          rules: [{ required: true, message: 'Sub-chain ID is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            loadData: async function (lf, currentNodeModel, field, query) {
              if (!query) {
                let options = [];
                try {
                  const { data } = await getWorkflowList(
                    false,
                    '',
                    1,
                    500,
                    false,
                  );
                  // let data=  await fetch(   lf.getEditorSetting()?.url+'/api/v1/rules?root=false').then(response => response.json())
                  data?.items.forEach((item) => {
                    options.push({
                      value: item.ruleChain.id,
                      label: item.ruleChain.name,
                    });
                  });
                } catch (e) {
                } finally {
                  field.component.options = options;
                }
              }
            },
          },
        },
        extend: {
          label: 'Inheritance Mode',
          desc: 'If enabled, does not merge sub-chain output relations and messages',
          rules: [{ required: true, message: 'Sub-chain ID is required' }],
        },
      },
      ref: {
        label: 'Node Reference',
        icon: '/images/ref.svg',
        relationTypeAllowCreate: true,
        relationTypes: [
          { label: 'Successful', value: 'Success' },
          { label: 'Failed', value: 'Failure' },
          { label: 'True', value: 'True' },
          { label: 'False', value: 'False' },
        ],
        desc: '<a href="https://rulego.cc/pages/ref_node/" target="_blank">Help documentation</a>',
        targetId: {
          label: 'Node ID',
          desc: 'Reference other nodes in this rule chain',
          rules: [{ required: true, message: 'Node ID is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            loadData: loadSelectNodes,
          },
        },
      },
      groupFilter: {
        label: 'Filter Group',
        icon: '/images/groupFilter.svg',
        desc: '<a href="https://rulego.cc/pages/b14e3b/" target="_blank">Help documentation</a>',
        allMatches: {
          label: 'Require full match',
          desc: '',
        },
        nodeIds: {
          label: 'Node ID list within group',
          desc: '',
          rules: [{ required: true, message: 'Node ID within group is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: false,
            multiple: true,
            loadData: loadSelectNodes,
          },
        },
        timeout: {
          label: 'Execution timeout within group in seconds. Default: 0',
          desc: 'Default 0, means no timeout',
        },
      },
      groupAction: {
        label: 'Node Group',
        desc: '<ul><li>Execute multiple nodes asynchronously, merge all results, send to next node</li><li>If the specified number of nodes all match the specified relationship type, send data to`Success`chain, otherwise send to`Failure`chain</li><a href="https://rulego.cc/pages/bf06e2/" target="_blank">Help documentation</a></ul>',
        icon: '/images/groupAction.svg',
        matchRelationType: {
          label: 'Matching relation. Default: Success',
          desc: '',
        },
        matchNum: {
          label: 'Matching node count. Default: 0',
          desc: 'Default 0, means all nodes satisfy the specified relation',
        },
        nodeIds: {
          label: 'Node ID list within group',
          desc: '',
          rules: [{ required: true, message: 'Node ID within group is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: false,
            multiple: true,
            loadData: loadSelectNodes,
          },
        },
        timeout: {
          label: 'Execution timeout within group in seconds. Default: 0',
          desc: 'Default 0, means no timeout',
        },
      },
      iterator: {
        label: 'Iterator',
        desc: '<ul><li>Deprecated, use for component instead</li><li>Iterate msg or msg specified field item values to next node, traverse field value must be true`Array`or`{key:value}`Type</li><li>If item satisfies jsScript, the item data will be sent via`True`chain to the next node, otherwise via`False`chain to the next node</li><li>If the specified field is not found, JS script execution fails, or the traversed object is not `Array`or`{key:value}`, the error information will be sent via`Failure`chain to the next node</li><li>After iteration completes, via`Success`chain to send original msg to next node</li><a href="https://rulego.cc/pages/5898a0/" target="_blank">Help documentation</a></ul>',
        icon: '/images/iterator.svg',
        fieldName: {
          label: 'Traverse Field',
          desc: 'If empty, traverses entire message. Supports nested access to message fields, e.g.: items.value, items',
        },
        jsScript: {
          label: 'function Filter(item,index,metadata) {',
          desc: '} JavaScript to match item, optional. If empty, traverses all items',
        },
      },
      join: {
        label: 'Merge',
        desc: '<ul><li>MergeMultiple async node execution results</li><a href="https://rulego.cc/pages/join/" target="_blank">Help documentation</a></ul>',
        icon: '/images/join.svg',
        timeout: {
          label: 'Execution timeout within group in seconds. Default: 0',
          desc: 'Default 0, means no timeout',
        },
      },
      fork: {
        label: 'Parallel Gateway',
        desc: '<ul><li>Split the flow into multiple parallel execution paths</li><a href="https://rulego.cc/pages/fork/" target="_blank">Help documentation</a></ul>',
        icon: '/images/fork.svg',
      },
      'text/template': {
        label: 'Template Conversion',
        icon: '/images/template.svg',
        desc: '<a href="https://rulego.cc/pages/3ffde3/" target="_blank">Help documentation</a>',
        template: {
          label: 'Template content or file path',
          desc: 'If template file path, prefix with file:',
          component: {
            type: 'codeEditor',
          },
        },
      },
      exec: {
        label: 'Command Line',
        icon: '/images/ssh.svg',
        desc: '<ul><li>Only execute system whitelisted commands</li><a href="https://rulego.cc/pages/413ea9/" target="_blank">Help documentation</a></ul>',
        cmd: {
          label: 'Execute Command',
          desc: '',
          rules: [{ required: true, message: 'Execute Command is required' }],
        },
        args: {
          label: 'Parameter',
          desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
        },
        log: {
          label: 'Print Standard Output',
          desc: '',
        },
        replaceData: {
          label: 'Replace Data',
          desc: 'Replace Data with standard output. Default: false',
        },
      },
      'x/redisClient': {
        label: 'Redis',
        icon: '/images/redis.svg',
        desc: '<a href="https://rulego.cc/pages/de062b/" target="_blank">Help documentation</a>',
        server: {
          label: 'Redis server address',
          desc: '',
          rules: [{ required: true, message: 'Redis server address is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        password: {
          label: 'Password',
          desc: '',
        },
        poolSize: {
          label: 'Connection Pool Size',
          desc: '',
        },
        db: {
          label: 'Database Number',
          rules: [
            { required: true, message: 'This field is required' },
            { type: 'integer', required: true, message: 'Must be integer type' },
          ],
          desc: 'Default 0',
        },
        cmd: {
          label: 'Execute command, e.g.: SET/GET/DEL/HMSET/HMGET',
          desc: 'Supports ${metadata.key} placeholder to read metadata, ${msg.key} placeholder to read message payload key data, ${data} to get original message payload',
          rules: [{ required: true, message: 'Execute Command is required' }],
        },
        paramsExpr: {
          label: 'Command Dynamic Parameter',
          desc: 'Supports Expr expressions. E.g.: ["myhash2", "field1", "value1"], or get value through variables e.g.: msg represents message payload. Command Dynamic Parameter and Command Static Parameter, priority given to Command Dynamic Parameter value.',
        },
        params: {
          label: 'Command Static Parameter',
          desc: 'Supports ${metadata.key} placeholder to read metadata, ${msg.key} placeholder to read message payload key data, ${data} to get original message payload',
        },
      },
      'x/redisPub': {
        label: 'Redis publish',
        icon: '/images/redis.svg',
        desc: '<a href="https://rulego.cc/pages/x_redis_pub/" target="_blank">Help documentation</a>',
        server: {
          label: 'Redis server address',
          desc: '',
          rules: [{ required: true, message: 'Redis server address is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        password: {
          label: 'Password',
          desc: '',
        },
        poolSize: {
          label: 'Connection Pool Size',
          desc: '',
        },
        db: {
          label: 'Database Number',
          rules: [
            { required: true, message: 'This field is required' },
            { type: 'integer', required: true, message: 'Must be integer type' },
          ],
          desc: 'Default 0',
        },
        channel: {
          label: 'Publish Channel',
          desc: 'Supports ${metadata.key} placeholder to read metadata, ${msg.key} placeholder to read message payload key data',
          rules: [{ required: true, message: 'Publish Channel is required' }],
        },
      },
      'x/kafkaProducer': {
        label: 'Kafka',
        icon: '/images/kafka.svg',
        desc: '<a href="https://rulego.cc/pages/fa986d/" target="_blank">Help documentation</a>',
        server: {
          label: 'Kafka server address',
          desc: 'Multiple server addresses separated by comma, e.g.: 127.0.0.1:9092,127.0.0.2:9092',
          rules: [{ required: true, message: 'Server address is required' }],
        },
        topic: {
          label: 'Publish Topic',
          desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
          rules: [{ required: true, message: 'Topic is required' }],
        },
        key: {
          label: 'Partition Key',
          desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
        },
        partition: {
          label: 'Partition Number',
          desc: '',
        },
      },
      'x/luaFilter': {
        label: 'Lua Script Filter',
        icon: '/images/lua.svg',
        desc: '<ul><li>Use Lua script to filter msg, metadata, msgType. Route to True or False chain based on script return value.</li><li>Can also use Lua scripts for advanced operations such as encryption/decryption, I/O, network, file, etc.</li><a href="https://rulego.cc/pages/5d61cc/" target="_blank">Help documentation</a></ul>',
        script: {
          label: 'Script function body or script file path',
          desc: 'Only provide function body content. If file path, provide complete script function',
        },
      },
      'x/luaTransform': {
        label: 'Lua Script Transform',
        icon: '/images/lua.svg',
        desc: '<ul><li>luaScript converter. Use Lua scripts to transform or enhance msg, metadata, and msgType.</li><li>Can also use Lua scripts for advanced operations such as encryption/decryption, I/O, network, file, etc.</li><a href="https://rulego.cc/pages/bf0eaf/" target="_blank">Help documentation</a></ul>',
        script: {
          label: 'Script function body or script file path',
          desc: 'Only provide function body content. If file path, provide complete script function',
        },
      },
      'x/natsClient': {
        label: 'NATS',
        icon: '/images/nats.svg',
        desc: '<a href="https://rulego.cc/pages/9e177d/" target="_blank">Help documentation</a>',
        topic: {
          label: 'Publish Topic',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
        },
        server: {
          label: 'NATS Service Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: nats://127.0.0.1:4222',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        username: {
          label: 'Username',
          desc: '',
        },
        password: {
          label: 'Password',
          desc: '',
        },
      },
      'x/rabbitmqClient': {
        label: 'RabbitMQ',
        icon: '/images/rabbitmq.svg',
        desc: '<ul><li>Send message payload to RabbitMQ queue</li><li>Supports AMQP protocol</li><li><a href="https://rulego.cc/pages/rabbitmq-client/" target="_blank">Help documentation</li></ul></a>',
        server: {
          label: 'Service Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Format: amqp://[username:password]@host/[vhost]',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        key: {
          label: 'Route Key',
          desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
        },
        exchange: {
          label: 'Switch Name',
          desc: '',
        },
        exchangeType: {
          label: 'Switch Type',
          desc: 'Optional types: direct/fanout/headers/topic',
        },
        durable: {
          label: 'Persist',
          desc: '',
        },
        autoDelete: {
          label: 'Auto-delete',
          desc: '',
        },
      },
      'x/opengeminiWrite': {
        label: 'OpenGemini write',
        icon: '/images/opengemini-write.svg',
        desc: '<a href="https://rulego.cc/pages/opengemini-write/" target="_blank">Help documentation</a>',
        server: {
          label: 'OpenGemini service address',
          desc: 'Format: hostname:port. Multiple addresses separated by comma',
          rules: [{ required: true, message: 'Server address is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        database: {
          label: 'Database',
          desc: 'Supports ${} placeholder variables, e.g.: ${metadata.key}, ${msg.key}',
          rules: [{ required: true, message: 'Database is required' }],
        },
        username: {
          label: 'Username',
          desc: '',
        },
        password: {
          label: 'Password',
          desc: '',
        },
        token: {
          label: 'Token',
          desc: 'If Token is not empty, uses Token authentication',
        },
      },
      'x/opengeminiQuery': {
        label: 'OpenGemini read',
        icon: '/images/opengemini.svg',
        desc: '<a href="https://rulego.cc/pages/opengemini-query/" target="_blank">Help documentation</a>',
        server: {
          label: 'OpenGemini service address',
          desc: 'Format: hostname:port. Multiple addresses separated by comma',
          rules: [{ required: true, message: 'Service Address is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        database: {
          label: 'Database',
          desc: 'Supports ${} placeholder variables, e.g.: ${metadata.key}, ${msg.key}',
          rules: [{ required: true, message: 'Database is required' }],
        },
        username: {
          label: 'Username',
          desc: '',
        },
        password: {
          label: 'Password',
          desc: '',
        },
        token: {
          label: 'Token',
          desc: 'If Token is not empty, uses Token authentication',
        },
        command: {
          label: 'Query Statement',
          desc: 'Supports ${} placeholder variables, e.g.: ${metadata.key}, ${msg.key}',
          rules: [{ required: true, message: 'Server address is required' }],
        },
      },
      'x/grpcClient': {
        label: 'gRPC Client',
        icon: '/images/grpc.svg',
        desc: '<ul><li>Dynamically call gRPC service</li></li></ul><a href="https://rulego.cc/pages/grpc-client/" target="_blank">Help documentation</a>',
        server: {
          label: 'gRPC Service Address',
          desc: 'Format: hostname:port',
          rules: [{ required: true, message: 'Service Address is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        service: {
          label: 'Service Name',
          desc: 'Example: helloworld.Greeter. Supports ${} placeholder variables',
          rules: [{ required: true, message: 'Service Name is required' }],
        },
        method: {
          label: 'Method Name',
          desc: 'Example: SayHello. Supports ${} placeholder variables',
          rules: [{ required: true, message: 'Method Name is required' }],
        },
        request: {
          label: 'Request Parameter Content',
          desc: 'Example: {"name":"lala"}. If empty, uses the current message payload. Parameters use JSON encoding and must match the service/method requirements. Supports ${} placeholder variables',
          component: {
            type: 'textarea',
          },
        },
        headers: {
          label: 'Request Header',
          desc: 'Supports ${} placeholder variables',
        },
      },
      'x/mongodbClient': {
        label: 'MongoDB',
        icon: '/images/mongodb.svg',
        desc: '<ul><li>MongoDB Client</li></li></ul><a href="https://rulego.cc/pages/mongodb-client/" target="_blank">Help documentation</a>',
        server: {
          label: 'MongoDB service address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Allows selecting connection pool for connection',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        database: {
          label: 'Database',
          desc: 'Supports ${} placeholder variables',
          rules: [{ required: true, message: 'This field is required' }],
        },
        collection: {
          label: 'Collection',
          desc: 'Supports ${} placeholder variables',
          rules: [{ required: true, message: 'This field is required' }],
        },
        opType: {
          label: 'Operation Type',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: false,
            multiple: false,
            options: [
              {
                label: 'Insert',
                value: 'INSERT',
              },
              {
                label: 'Query',
                value: 'QUERY',
              },
              {
                label: 'Update',
                value: 'UPDATE',
              },
              {
                label: 'Delete',
                value: 'DELETE',
              },
            ],
          },
          rules: [{ required: true, message: 'This field is required' }],
          desc: '',
        },
        filter: {
          label: 'Filter Condition',
          desc: 'QueryYesCan be empty. Supports Expr expressions, example: {"age"": {"$gte": 18 }.',
        },
        doc: {
          label: 'Update/Insert Document',
          desc: 'Queryor delete. Can be empty. Supports Expr expressions, example: {"name":"test","age":18}.',
        },
        one: {
          label: 'Operate on single record',
          desc: '',
        },
      },
      'ai/createImage': {
        label: 'AI Image Generation',
        icon: '/images/generate-image.svg',
        desc: '<ul><li>Generate image from prompt</li><a href="https://rulego.cc/pages/b0e537/" target="_blank">Help documentation</a></ul>',
        url: {
          label: 'API Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: '',
        },
        key: {
          label: 'Authorization Secret Key',
          desc: '',
        },
        model: {
          label: 'Model',
          desc: 'Allow manual model input',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'dall-e-3',
                value: 'dall-e-3',
              },
              {
                label: 'dall-e-2',
                value: 'dall-e-2',
              },
            ],
          },
        },
        prompt: {
          label: 'Image Generation Prompt',
          desc: '',
          rules: [{ required: true, message: 'This field is required' }],
          component: {
            type: 'textarea',
          },
        },
        n: {
          label: 'Number of images to generate',
          desc: '',
          component: {
            type: 'slider',
            showInput: true,
            showTooltip: true,
            min: 1,
            max: 10,
            step: 1,
          },
        },
        responseFormat: {
          label: 'Response Format',
          desc: 'Default: url',
          rules: [{ required: true, message: 'This field is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'url',
                value: 'url',
              },
              {
                label: 'b64_json',
                value: 'b64_json',
              },
            ],
          },
        },
        quality: {
          label: 'Image Quality',
          desc: 'Default: standard',
          rules: [{ required: true, message: 'This field is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'standard',
                value: 'standard',
              },
              {
                label: 'hd',
                value: 'hd',
              },
            ],
          },
        },
        size: {
          label: 'Image Size',
          desc: 'Default: 1024x1024',
          rules: [{ required: true, message: 'This field is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: '256x256',
                value: '256x256',
              },
              {
                label: '512x512',
                value: '512x512',
              },
              {
                label: '1024x1024',
                value: '1024x1024',
              },
              {
                label: '1792x1024',
                value: '1792x1024',
              },
              {
                label: '1024x1792',
                value: '1024x1792',
              },
            ],
          },
        },
        style: {
          label: 'Image Style',
          desc: 'Default: vivid',
          rules: [{ required: true, message: 'This field is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'vivid',
                value: 'vivid',
              },
              {
                label: 'natural',
                value: 'natural',
              },
            ],
          },
        },
      },
      'ai/llm': {
        label: 'AI Text Generation',
        icon: '/images/generate-text.svg',
        desc: '<ul><li>Generate text from prompt</li><a href="https://rulego.cc/pages/a43229/" target="_blank">Help documentation</a></ul>',
        url: {
          label: 'API Address',
          desc: '',
        },
        key: {
          label: 'Authorization Secret Key',
          desc: '',
        },
        model: {
          label: 'Model',
          desc: 'Allow manual model input',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'DeepSeek-R1-Distill-Qwen-32B',
                value: 'DeepSeek-R1-Distill-Qwen-32B',
              },
              {
                label: 'DeepSeek-R1',
                value: 'DeepSeek-R1',
              },
              {
                label: 'Qwen2-7B-Instruct',
                value: 'Qwen2-7B-Instruct',
              },
              {
                label: 'Qwen2-VL-72B',
                value: 'Qwen2-VL-72B',
              },
              {
                label: 'o1-mini',
                value: 'o1-mini',
              },
              {
                label: 'gpt-4o',
                value: 'gpt-4o',
              },
              {
                label: 'gpt-4o-mini',
                value: 'gpt-4o-mini',
              },
            ],
          },
        },
        systemPrompt: {
          label: 'System Message',
          desc: 'Pre-defines the model foundational behavior framework and response style. Supports ${} placeholder variables',
          component: {
            type: 'textarea',
          },
        },
        messages: {
          label: 'Context/user message list',
          desc: '',
          rules: [{ required: true, message: 'This field is required' }],
          component: {
            type: 'table',
            options: [
              {
                name: 'role',
                label: 'Role',
                type: 'string',
                rules: [{ required: true, message: 'This field is required' }],
                component: {
                  type: 'select',
                  multiple: false,
                  options: [
                    {
                      label: 'USER',
                      value: 'user',
                    },
                    {
                      label: 'ASSISTANT',
                      value: 'assistant',
                    },
                  ],
                },
              },
              {
                name: 'content',
                label: 'Message Content',
                type: 'string',
                rules: [{ required: true, message: 'This field is required' }],
                desc: 'USER role: provides instructions, queries, or text-based input to model. ASSISTANT role: model responses based on user messages',
                component: {
                  type: 'textarea',
                },
              },
            ],
          },
        },
        images: {
          label: 'Visual',
          desc: 'Image URL list. AI model will answer user questions based on image content understanding. Requires AI model API support (Qwen2-VL-72B supports vision). Supports ${} placeholder variables',
        },
        params: {
          label: 'Large Model Parameter',
          desc: '',
          temperature: {
            label: 'Temperature',
            desc: 'Sampling temperature controls output randomness. Range [0.0, 2.0]. Higher values produce more random and creative output; lower values produce more stable output',
            component: {
              type: 'slider',
              showInput: true,
              showTooltip: true,
              min: 0.0,
              max: 2.0,
              step: 0.1,
            },
          },
          topP: {
            label: 'Top P',
            desc: 'Control diversity via nucleus sampling: 0.5 considers half of all possible weighted options. Range: [0.0, 1.0]',
            component: {
              type: 'slider',
              showInput: true,
              showTooltip: true,
              min: 0.0,
              max: 1.0,
              step: 0.1,
            },
          },
          presencePenalty: {
            label: 'Penalty Exists',
            desc: 'Apply penalty to log probability of existing tokens in text',
            component: {
              type: 'slider',
              showInput: true,
              showTooltip: true,
              min: 0.0,
              max: 1.0,
              step: 0.1,
            },
          },
          frequencyPenalty: {
            label: 'Rate Penalty',
            desc: 'Apply penalty to log probability of tokens appearing in text. Range [0.0,1.0]',
            component: {
              type: 'slider',
              showInput: true,
              showTooltip: true,
              min: 0.0,
              max: 1.0,
              step: 0.1,
            },
          },
          maxTokens: {
            label: 'Max output length',
            desc: '',
            component: {
              type: 'input-number',
              min: 0,
              max: 1000000,
              step: 10,
            },
          },
          stop: {
            label: 'Model stop output token',
            desc: '',
          },
          responseFormat: {
            label: 'Output Result Format',
            desc: 'Values: text, json_object, json_schema. Default: text',
            component: {
              type: 'select',
              multiple: false,
              options: [
                {
                  label: 'text',
                  value: 'text',
                },
                {
                  label: 'json_object',
                  value: 'json_object',
                },
                {
                  label: 'json_schema',
                  value: 'json_schema',
                },
              ],
            },
          },
          jsonSchema: {
            label: 'JSON Schema',
            desc: '',
            component: {
              type: 'codeEditor',
            },
          },
          keepThink: {
            label: 'Whether to preserve output thinking process',
            desc: 'Only effective for text response format',
          },
        },
      },
      'ci/exec': {
        label: 'Command Line',
        icon: '/images/ssh.svg',
        desc: '<ul><li>Only executes system whitelisted commands</li></ul>',
        command: {
          label: 'Execute Command',
          desc: '',
        },
        args: {
          label: 'Parameter',
          desc: 'Use ${metadata.key} to read metadata variables or ${msg.key} to read message payload variables for replacement',
        },
        log: {
          label: 'Print Standard Output',
          desc: '',
        },
        replaceData: {
          label: 'Replace Data',
          desc: 'Replace Data with standard output. Default: false',
        },
      },
      'ci/gitClone': {
        label: 'Git Pull',
        icon: '/images/git.svg',
        desc: '<ul><li>gitClone or pull repository code</li><a href="https://rulego.cc/pages/ci-git-clone/" target="_blank">Help documentation</a></ul>',
        repository: {
          label: 'Repository Address',
          desc: 'Example: https://github.com/rulego/rulego.git',
        },
        directory: {
          label: 'Clone to Local Directory',
          desc: 'Defaults to workDir value in metadata',
        },
        reference: {
          label: 'Reference Name',
          desc: 'Can be branch name, tag name, or full reference name. Example: refs/heads/main. Defaults to ref value in metadata',
        },
        authType: {
          label: 'Authentication Type',
          desc: 'Can be: ssh/password/token',
        },
        authUser: {
          label: 'Username',
          desc: '',
        },
        authPassword: {
          label: 'Password or token',
          desc: 'Password or token',
        },
        authPemFile: {
          label: 'Secret Key File Path',
          desc: '',
        },
        proxyUrl: {
          label: 'Proxy URL',
          desc: '',
        },
        proxyUsername: {
          label: 'Proxy Username',
          desc: '',
        },
        proxyPassword: {
          label: 'Proxy Password',
          desc: '',
        },
      },
      'ci/gitPush': {
        label: 'Git Push',
        icon: '/images/git-push.svg',
        desc: '<ul><li>gitPush</li><a href="https://rulego.cc/pages/ci-git-push/" target="_blank">Help documentation</a></ul>',
        repository: {
          label: 'Repository Address',
          desc: 'Example: https://github.com/rulego/rulego.git',
        },
        directory: {
          label: 'Local Directory',
          desc: 'Defaults to workDir value in metadata',
        },
        refSpecs: {
          label: 'Local to remote branch mapping',
          desc: 'Example: refs/heads/your-branch:refs/heads/your-branch. Multiple mappings separated by comma',
        },
        authType: {
          label: 'Authentication Type',
          desc: 'Can be: ssh/password/token',
        },
        authUser: {
          label: 'Username',
          desc: '',
        },
        authPassword: {
          label: 'Password or token',
          desc: 'Password or token',
        },
        authPemFile: {
          label: 'Secret Key File Path',
          desc: '',
        },
        proxyUrl: {
          label: 'Proxy Address',
          desc: '',
        },
        proxyUsername: {
          label: 'Proxy Username',
          desc: '',
        },
        proxyPassword: {
          label: 'Proxy Password',
          desc: '',
        },
      },
      'ci/gitCommit': {
        label: 'Git Commit',
        icon: '/images/git-commit.svg',
        desc: '<ul><li>gitCommit; if file has no changes, forward to Failed chain</li><a href="https://rulego.cc/pages/ci-git-commit/" target="_blank">Help documentation</a></ul>',
        directory: {
          label: 'Local Directory',
          desc: 'Defaults to workDir value in metadata',
        },
        pattern: {
          label: 'File match pattern to add',
          desc: 'Must be relative to current workspace. Example: /example/*.go',
          rules: [{ required: true, message: 'File match pattern must be provided' }],
        },
        message: {
          label: 'Git Commit',
          desc: '',
          rules: [{ required: true, message: 'Submit Message is required' }],
        },
        signature: {
          label: 'Author Information',
          desc: '',
          authorName: {
            label: 'Author Name',
            desc: '',
          },
          authorEmail: {
            label: 'Author Email',
            desc: '',
          },
        },
      },
      'ci/gitCreateTag': {
        label: 'Git Create Tag',
        icon: '/images/git-tag.svg',
        desc: '<ul><li>gitCommit; if file has no changes, forward to Failed chain</li><a href="https://rulego.cc/pages/ci-git-create-tag/" target="_blank">Help documentation</a></ul>',
        directory: {
          label: 'Local Directory',
          desc: 'Defaults to workDir value in metadata',
        },
        tag: {
          label: 'Label Name',
          desc: '',
          rules: [{ required: true, message: 'Label name is required' }],
        },
        message: {
          label: 'Label Message',
          desc: '',
          rules: [{ required: true, message: 'Label message is required' }],
        },
        signature: {
          label: 'Author Information',
          desc: '',
          authorName: {
            label: 'Author Name',
            desc: '',
          },
          authorEmail: {
            label: 'Author Email',
            desc: '',
          },
        },
      },
      'ci/gitLog': {
        label: 'Get Git Log',
        icon: '/images/git-log.svg',
        desc: '<ul><li>Get git commit log</li><a href="https://rulego.cc/pages/ci-git-log/" target="_blank">Help documentation</a></ul>',
        directory: {
          label: 'Local Directory',
          desc: 'Can retrieve via ${msg.xx} variable. Defaults to ${metadata.workDir} value',
        },
        limit: {
          label: 'Max Log Count',
          desc: '',
          rules: [],
        },
        startTime: {
          label: 'Start Submit Time',
          desc: 'Can retrieve via ${msg.xx} variable. Format: yyyy-MM-dd or yyyy-MM-dd HH:mm:ss. Example: 2006-01-02 15:04:05',
        },
        endTime: {
          label: 'End Submit Time',
          desc: 'Can retrieve via ${msg.xx} variable. Format: yyyy-MM-dd or yyyy-MM-dd HH:mm:ss. Example: 2006-01-02 15:04:05',
        },
      },
      'ci/ps': {
        label: 'Server Metric',
        icon: '/images/ps.svg',
        desc: 'Used to monitor server CPU, memory, disk and other metrics.<a href="https://rulego.cc/pages/ci-ps/" target="_blank">Help documentation</a>',
        options: {
          label: 'Metric List',
          desc: 'If empty, queries all metrics',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: true,
            options: [
              { label: 'Host Information', value: 'host/info' },
              { label: 'CPU Info', value: 'cpu/info' },
              { label: 'Virtual Memory Info', value: 'mem/virtualMemory' },
              { label: 'Swap Memory Info', value: 'mem/swapMemory' },
              { label: 'Disk Usage', value: 'disk/usage' },
              { label: 'Disk I/O counter information', value: 'disk/ioCounters' },
              { label: 'Network I/O counter information', value: 'net/ioCounters' },
              { label: 'Network Interface Info', value: 'net/interfaces' },
            ],
            placeholder: 'Please select query metric',
          },
        },
      },
      'x/opcuaRead': {
        label: 'OPC_UA Read',
        icon: '/images/opcua_read.svg',
        category: 'iot',
        desc: '<ul><li>Get message payload from specified node list point data, then forward to next node via Success chain.</li><a href="https://rulego.cc/pages/x-opcua-read/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Server Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: opc.tcp://localhost:4840',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        auth: {
          label: 'Authorization Method',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Anonymous',
                value: 'anonymous',
              },
              {
                label: 'Username',
                value: 'username',
              },
              {
                label: 'Certificate',
                value: 'certificate',
              },
            ],
          },
        },
        username: {
          label: 'Username',
          desc: 'If authorization is username, must be filled',
        },
        password: {
          label: 'Password',
          desc: 'If authorization is username, must be filled',
        },
        certFile: {
          label: 'Certificate File Path',
          desc: 'If authorization is certificate, must be filled',
        },
        certKeyFile: {
          label: 'Key File Path',
          desc: 'If authorization is certificate, must be filled',
        },
        mode: {
          label: 'Mode',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Auto',
                value: 'auto',
              },
              {
                label: 'None',
                value: 'none',
              },
              {
                label: 'Sign',
                value: 'sign',
              },
              {
                label: 'Signandencrypt',
                value: 'signandencrypt',
              },
            ],
          },
        },
        policy: {
          label: 'Policy',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Auto',
                value: 'auto',
              },
              {
                label: 'None',
                value: 'none',
              },
              {
                label: 'Basic128Rsa15',
                value: 'Basic128Rsa15',
              },
              {
                label: 'Basic256',
                value: 'Basic256',
              },
              {
                label: 'Basic256Sha256',
                value: 'Basic256Sha256',
              },
              {
                label: 'Aes128_Sha256_RsaOaep',
                value: 'Aes128_Sha256_RsaOaep',
              },
              {
                label: 'Aes256_Sha256_RsaPss',
                value: 'Aes256_Sha256_RsaPss',
              },
            ],
          },
        },
      },
      'x/opcuaWrite': {
        label: 'OPC_UA Write',
        icon: '/images/opcua_write.svg',
        category: 'iot',
        desc: '<ul><li>Write message payload point data list to OPCUA server.</li><a href="https://rulego.cc/pages/x-opcua-write/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Server Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: opc.tcp://localhost:4840',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        auth: {
          label: 'Authorization Method',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Anonymous',
                value: 'anonymous',
              },
              {
                label: 'Username',
                value: 'username',
              },
              {
                label: 'Certificate',
                value: 'certificate',
              },
            ],
          },
        },
        username: {
          label: 'Username',
          desc: 'If authorization is username, must be filled',
        },
        password: {
          label: 'Password',
          desc: 'If authorization is username, must be filled',
        },
        certFile: {
          label: 'Certificate File Path',
          desc: 'If authorization is certificate, must be filled',
        },
        certKeyFile: {
          label: 'Key File Path',
          desc: 'If authorization is certificate, must be filled',
        },
        mode: {
          label: 'Mode',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Auto',
                value: 'auto',
              },
              {
                label: 'None',
                value: 'none',
              },
              {
                label: 'Sign',
                value: 'sign',
              },
              {
                label: 'Signandencrypt',
                value: 'signandencrypt',
              },
            ],
          },
        },
        policy: {
          label: 'Policy',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Auto',
                value: 'auto',
              },
              {
                label: 'None',
                value: 'none',
              },
              {
                label: 'Basic128Rsa15',
                value: 'Basic128Rsa15',
              },
              {
                label: 'Basic256',
                value: 'Basic256',
              },
              {
                label: 'Basic256Sha256',
                value: 'Basic256Sha256',
              },
              {
                label: 'Aes128_Sha256_RsaOaep',
                value: 'Aes128_Sha256_RsaOaep',
              },
              {
                label: 'Aes256_Sha256_RsaPss',
                value: 'Aes256_Sha256_RsaPss',
              },
            ],
          },
        },
      },
      'x/otel': {
        label: 'OpenTelemetry',
        icon: '/images/otel.svg',
        desc: '<ul><li>Send metrics to backend systems via OTLP protocol, e.g.: Prometheus, Datadog, InfluxDB, etc.</li><a href="https://rulego.cc/pages/x-otel/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'OTLP backend system address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: localhost:4318',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        protocol: {
          label: 'Transport Protocol',
          rules: [{ required: true, message: 'Protocol is required' }],
          component: {
            type: 'select',
            filterable: true,
            allowCreate: false,
            multiple: false,
            options: [
              {
                label: 'HTTP',
                value: 'HTTP',
              },
              {
                label: 'gRPC',
                value: 'GRPC',
              },
            ],
          },
        },
        metricExpr: {
          label: 'Metric Configuration Expression',
          desc: 'Example: ${msg.metrics} Metric configuration expression and metric configuration can coexist',
        },
        metrics: {
          label: 'Metric Configuration',
          rules: [],
          component: {
            type: 'table',
            options: [
              {
                name: 'metricName',
                label: 'Metric Name',
                type: 'string',
                rules: [{ required: true, message: 'This field is required' }],
              },

              {
                name: 'unit',
                label: 'Unit',
                type: 'string',
                component: {
                  type: 'select',
                  filterable: true,
                  allowCreate: true,
                  multiple: false,
                  options: [
                    {
                      label: 'ms',
                      value: 'ms',
                    },
                    {
                      label: 's',
                      value: 's',
                    },
                    {
                      label: 'B',
                      value: 'B',
                    },
                    {
                      label: 'KB',
                      value: 'KB',
                    },
                    {
                      label: 'MB',
                      value: 'MB',
                    },
                    {
                      label: 'G',
                      value: 'G',
                    },
                    {
                      label: '1',
                      value: '1',
                    },
                    {
                      label: '%',
                      value: '%',
                    },
                  ],
                },
              },
              {
                name: 'opType',
                label: 'Operation Type',
                type: 'string',
                component: {
                  type: 'select',
                  filterable: true,
                  allowCreate: false,
                  multiple: false,
                  options: [
                    {
                      label: 'Counter',
                      value: 'COUNTER',
                    },
                    {
                      label: 'Dashboard',
                      value: 'GAUGE',
                    },
                    {
                      label: 'Histogram',
                      value: 'HISTOGRAM',
                    },
                  ],
                },
              },
              {
                name: 'description',
                label: 'Metric Description',
                type: 'string',
                component: {
                  type: 'textarea',
                },
              },
              {
                name: 'value',
                label: 'Value Expression',
                desc: 'Example: ${msg.ipCount}',
                type: 'string',
              },
              {
                name: 'labels',
                label: 'Label Expression',
                desc: 'Example: ${msg.labels}',
                type: 'string',
              },
            ],
          },
        },
      },
      'x/wukongimSender': {
        label: 'WuKongIM send',
        icon: '/images/wukongim.svg',
        desc: '<ul><li>Send message payload to WuKongIM specified channel or user</li><a href="https://rulego.cc/pages/x-wukongim/" target="_blank">Help documentation</a></ul>',
        server: {
          label: 'Server Address',
          rules: [{ required: true, message: 'This field is required' }],
          desc: 'Example: tcp://175.27.245.108:15100',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        uID: {
          label: 'User ID',
          rules: [{ required: true, message: 'This field is required' }],
        },
        token: {
          label: 'Login Password',
          desc: '',
        },
        connectTimeout: {
          label: 'Connection Timeout (seconds)',
          desc: '',
        },
        protoVersion: {
          label: 'Protocol Version',
          desc: 'Example: 3',
        },
        pingInterval: {
          label: 'Heartbeat interval in seconds',
          desc: 'Example: 30',
        },
        reconnect: {
          label: 'Auto-reconnect',
          desc: '',
        },
        autoAck: {
          label: 'Auto-acknowledge messages',
          desc: '',
        },
        channelType: {
          label: 'Channel Type',
          desc: '',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
            options: [
              {
                label: 'Personal Channel',
                value: '1',
              },
              {
                label: 'Group Channel',
                value: '2',
              },
              {
                label: 'Support Channel',
                value: '3',
              },
              {
                label: 'Community Channel',
                value: '4',
              },
              {
                label: 'Community Topic Channel',
                value: '5',
              },
              {
                label: 'News Channel',
                value: '6',
              },
              {
                label: 'Data Channel',
                value: '7',
              },
            ],
          },
        },
        channelID: {
          label: 'Channel ID',
          desc: 'Supports ${} placeholder variables. For personal channels, use user ID',
        },
        noPersist: {
          label: 'Do not store',
          desc: '',
        },
        syncOnce: {
          label: 'Sync once',
          desc: '',
        },
        redDot: {
          label: 'Show red dot',
          desc: '',
        },
        noEncrypt: {
          label: 'No encryption required',
          desc: '',
        },
      },
      'x/modbus': {
        label: 'Modbus Read/Write',
        icon: '/images/modbus.svg',
        category: 'iot',
        desc: "<ul><li>Get message payload from specified node list point data, then forward to next node via Success chain.</li><a href='https://rulego.cc/pages/x-modbus/' target='_blank'>Help documentation</a></ul>",
        server: {
          label: 'Server Address',
          rules: [
            {
              required: true,
              message: 'This field is required',
            },
          ],
          desc: 'Server address format: <mode>://<serial device or host:port> Example: tcp://hostname-or-ip-address:502; rtu:///dev/ttyUSB0',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: true,
            multiple: false,
          },
        },
        cmd: {
          label: 'Modbus method name',
          desc: 'Modbus command name',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: false,
            multiple: false,
            options: [
              {
                label: 'Read Coil Status',
                value: 'ReadCoils',
              },
              {
                label: 'Read Single Coil Status',
                value: 'ReadCoil',
              },
              {
                label: 'Read Discrete Input Status',
                value: 'ReadDiscreteInputs',
              },
              {
                label: 'Read single discrete input status',
                value: 'ReadDiscreteInput',
              },
              {
                label: 'Read Register',
                value: 'ReadRegisters',
              },
              {
                label: 'Read Single Register',
                value: 'ReadRegister',
              },
              {
                label: 'Read unsigned 32-bit integer',
                value: 'ReadUint32s',
              },
              {
                label: 'Read single unsigned 32-bit integer',
                value: 'ReadUint32',
              },
              {
                label: 'Read Float 32-bit',
                value: 'ReadFloat32s',
              },
              {
                label: 'Read single 32-bit floating point number',
                value: 'ReadFloat32',
              },
              {
                label: 'Read unsigned 64-bit integer',
                value: 'ReadUint64s',
              },
              {
                label: 'Read single unsigned 64-bit integer',
                value: 'ReadUint64',
              },
              {
                label: 'Read Float 64-bit',
                value: 'ReadFloat64s',
              },
              {
                label: 'Read single 64-bit floating point number',
                value: 'ReadFloat64',
              },
              {
                label: 'Read Byte Data',
                value: 'ReadBytes',
              },
              {
                label: 'Read Raw Byte Data',
                value: 'ReadRawBytes',
              },
              {
                label: 'Write Coil Status',
                value: 'WriteCoil',
              },
              {
                label: 'Write Multiple Coil Status',
                value: 'WriteCoils',
              },
              {
                label: 'Write Register',
                value: 'WriteRegister',
              },
              {
                label: 'Write Multiple Registers',
                value: 'WriteRegisters',
              },
              {
                label: 'Write unsigned 32-bit integer',
                value: 'WriteUint32',
              },
              {
                label: 'Write multiple unsigned 32-bit integers',
                value: 'WriteUint32s',
              },
              {
                label: 'Write Float 32-bit',
                value: 'WriteFloat32',
              },
              {
                label: 'Write multiple 32-bit floating point numbers',
                value: 'WriteFloat32s',
              },
              {
                label: 'Write unsigned 64-bit integer',
                value: 'WriteUint64',
              },
              {
                label: 'Write multiple unsigned 64-bit integers',
                value: 'WriteUint64s',
              },
              {
                label: 'Write Float 64-bit',
                value: 'WriteFloat64',
              },
              {
                label: 'Write multiple 64-bit floating point numbers',
                value: 'WriteFloat64s',
              },
              {
                label: 'Write Byte Data',
                value: 'WriteBytes',
              },
              {
                label: 'Write Raw Byte Data',
                value: 'WriteRawBytes',
              },
            ],
          },
        },
        unitId: {
          label: 'Slave Number',
          desc: 'Unit number (slave ID) to use. Format: uint8. Example: 1',
          rules: [
            {
              required: true,
              message: 'This field is required',
            },
          ],
        },
        address: {
          label: 'Register Address',
          desc: 'Register address, supports ${} placeholder variables. Format: uint16. Example: 50 or 0x32',
        },
        quantity: {
          label: 'Register Count',
          desc: 'Register count, supports ${} placeholder variables. Example: 1',
        },
        value: {
          label: 'Register Value',
          desc: 'Register value, supports ${} placeholder variables. Not required for read operations. Multiple values separated by comma, e.g.: 0x01,0x01 true 51,52',
        },
        regType: {
          label: 'Register Type',
          desc: 'Register Type',
          component: {
            type: 'select',
            filterable: true,
            allowCreate: false,
            multiple: false,
            options: [
              {
                label: 'Holding Register 0x3',
                value: '0',
              },
              {
                label: 'Input register 0x4',
                value: '1',
              },
            ],
          },
        },
        encodingConfig: {
          label: 'Encoding Configuration',
          desc: '',
          endianness: {
            label: 'Byte Order',
            desc: 'Register Byte Order',
            component: {
              type: 'select',
              filterable: true,
              allowCreate: false,
              multiple: false,
              options: [
                {
                  label: 'Big Endian',
                  value: 1,
                },
                {
                  label: 'Little Endian',
                  value: 2,
                },
              ],
            },
          },
          wordOrder: {
            label: 'Byte Order',
            desc: '32-bit register word order',
            component: {
              type: 'select',
              filterable: true,
              allowCreate: false,
              multiple: false,
              options: [
                {
                  label: 'Big Endian',
                  value: 1,
                },
                {
                  label: 'Little Endian',
                  value: 2,
                },
              ],
            },
          },
        },
        rtuConfig: {
          label: 'RTU Configuration',
          desc: '',
          parity: {
            label: 'Parity Bits',
            desc: 'Serial link parity mode (RTU mode only)',
            component: {
              type: 'select',
              filterable: true,
              allowCreate: false,
              multiple: false,
              options: [
                {
                  label: 'No Parity',
                  value: 0,
                },
                {
                  label: 'Even Parity',
                  value: 1,
                },
                {
                  label: 'Odd Parity',
                  value: 2,
                },
              ],
            },
          },
          speed: {
            label: 'Serial Baud Rate',
            desc: 'Set serial link baud rate (RTU mode only)',
            component: {
              type: 'select',
              filterable: true,
              allowCreate: true,
              multiple: false,
              options: [
                {
                  label: '38400',
                  value: 38400,
                },
                {
                  label: '19200',
                  value: 19200,
                },
                {
                  label: '9600',
                  value: 9600,
                },
                {
                  label: '4800',
                  value: 4800,
                },
              ],
            },
          },
          dataBits: {
            label: 'Data Bits',
            desc: 'Set serial data bit count (RTU mode only)',
          },
          stopBits: {
            label: 'Stop Bits',
            desc: 'Set serial stop bits (RTU mode only)',
          },
        },
        tcpConfig: {
          label: 'TCP Configuration',
          desc: '',
          timeout: {
            label: 'Timeout Duration',
            desc: 'Set request timeout in seconds',
          },
          certPath: {
            label: 'Certificate Path',
            desc: 'Certificate File Path',
          },
          keyPath: {
            label: 'Key Path',
            desc: 'Key File Path',
          },
          caPath: {
            label: 'CA Certificate Path',
            desc: 'CA Certificate File Path',
          },
        },
      },
    },
  },
  Input: 'Input',
  relationTypes: {
    Success: 'Successful',
    Failure: 'Failed',
    True: 'True',
    False: 'False',
  },
};
