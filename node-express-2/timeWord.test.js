const timeWord = require('./timeWord');

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });
  
  test(`Works : regular time`, ()=>{
    const res = timeWord("11:59");

    expect(res).toEqual("eleven fifty nine am");
  });

  test(`Works : 12:00 pm --> should return noon`, ()=>{
    const res = timeWord("12:00");

    expect(res).toEqual("noon");
  });

  test(`Works : 00:00 am --> should return midnight`, ()=>{
    const res = timeWord("00:00");

    expect(res).toEqual("midnight");
  });

  test(`Works : if minutes is equal to 00, should return string with o'clock (am)`, ()=>{
    const res = timeWord("5:00");

    expect(res).toEqual("five o'clock am");
  });

  test(`Works : if minutes is equal to 00, should return string with o'clock (pm)`, ()=>{
    const res = timeWord("15:00");

    expect(res).toEqual("three o'clock pm");
  });

  test(`Works : if minutes is less than 10, should return string with oh before the minutes is converted to string (am)`, ()=>{
    const res = timeWord("5:09");

    expect(res).toEqual("five oh nine am");
  });

  test(`Works : if minutes is less than 10, should return string with oh before the minutes is converted to string (pm)`, ()=>{
    const res = timeWord("15:09");

    expect(res).toEqual("three oh nine pm");
  });
});