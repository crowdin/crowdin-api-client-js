import { Greeter } from '..';

test('My Greeter', () => {
    expect(Greeter('Carl')).toBe('Hello Carl');
});