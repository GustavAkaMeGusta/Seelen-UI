import { VariableConvention } from '.';

describe('VariableConvention', () => {
  test('snakeToCamel', () => {
    expect(VariableConvention.snakeToCamel('hello_world')).toBe('helloWorld');
    expect(VariableConvention.snakeToCamel('testing_snake_case_text')).toBe('testingSnakeCaseText');
    expect(VariableConvention.snakeToCamel('hello_world_1_2_3')).toBe('helloWorld123');
  });

  test('camelToSnake', () => {
    expect(VariableConvention.camelToSnake('HelloWorld')).toBe('hello_world');
    expect(VariableConvention.camelToSnake('helloWorld')).toBe('hello_world');
    expect(VariableConvention.camelToSnake('testingSnakeCaseText')).toBe('testing_snake_case_text');
    expect(VariableConvention.camelToSnake('helloWorld123')).toBe('hello_world_1_2_3');
  });

  test('deepKeyParser', () => {
    const camelObject = [
      {
        helloWorld: {
          myWorld: 123,
        },
        testing: {
          camelCase: {
            deepCamelCase: 'text',
          },
          arrayCamelCase: [
            {
              deepCamelCase0: 'text',
            },
            'text',
          ],
        },
      },
    ];

    const snakeObject = [
      {
        hello_world: {
          my_world: 123,
        },
        testing: {
          camel_case: {
            deep_camel_case: 'text',
          },
          array_camel_case: [
            {
              deep_camel_case_0: 'text',
            },
            'text',
          ],
        },
      },
    ];

    expect(VariableConvention.deepKeyParser(camelObject, VariableConvention.camelToSnake)).toEqual(snakeObject);
    expect(VariableConvention.deepKeyParser(snakeObject, VariableConvention.snakeToCamel)).toEqual(camelObject);
  });

  test('camelToUser', () => {
    expect(VariableConvention.camelToUser('helloWorld')).toBe('hello world');
    expect(VariableConvention.camelToUser('HelloWorld')).toBe('hello world');
    expect(VariableConvention.camelToUser('testingCamelCaseText')).toBe('testing camel case text');
    expect(VariableConvention.camelToUser('helloWorld123')).toBe('hello world 1 2 3');
  });

  test('fromSnakeToCamel', () => {
    const snake = {
      hello_world: {
        my_world: 1,
      },
      array_test: [
        {
          deep_case: 'text',
        },
      ],
    };

    const camel = {
      helloWorld: {
        myWorld: 1,
      },
      arrayTest: [
        {
          deepCase: 'text',
        },
      ],
    };

    expect(VariableConvention.fromSnakeToCamel(snake)).toEqual(camel);
  });

  test('fromCamelToSnake', () => {
    const camel = {
      helloWorld: {
        myWorld: 1,
      },
      arrayTest: [
        {
          deepCase: 'text',
        },
      ],
    };

    const snake = {
      hello_world: {
        my_world: 1,
      },
      array_test: [
        {
          deep_case: 'text',
        },
      ],
    };

    expect(VariableConvention.fromCamelToSnake(camel)).toEqual(snake);
  });
});
