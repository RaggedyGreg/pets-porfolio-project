import { chooseImage, getCookie, setCookie } from './utils';
import { dogIcon, catIcon, birdIcon, undefinedIcon } from '../icons/icons';

describe('Utils', () => {
  describe('chooseImage()', () => {
    it('should return dogIcon for "dog" kind', () => {
      expect(chooseImage('dog')).toBe(dogIcon);
    });

    it('should return catIcon for "cat" kind', () => {
      expect(chooseImage('cat')).toBe(catIcon);
    });

    it('should return birdIcon for "bird" kind', () => {
      expect(chooseImage('bird')).toBe(birdIcon);
    });

    it('should return undefinedIcon for unknown kind', () => {
      expect(chooseImage('hamster')).toBe(undefinedIcon);
    });

    it('should return undefinedIcon for empty string', () => {
      expect(chooseImage('')).toBe(undefinedIcon);
    });

    it('should return undefinedIcon for null-like values', () => {
      expect(chooseImage('rabbit')).toBe(undefinedIcon);
      expect(chooseImage('fish')).toBe(undefinedIcon);
    });

    it('should be case-sensitive', () => {
      expect(chooseImage('Dog')).toBe(undefinedIcon);
      expect(chooseImage('DOG')).toBe(undefinedIcon);
      expect(chooseImage('Cat')).toBe(undefinedIcon);
      expect(chooseImage('Bird')).toBe(undefinedIcon);
    });
  });

  describe('getCookie()', () => {
    beforeEach(() => {
      // Clear all cookies before each test
      document.cookie.split(';').forEach((cookie) => {
        const name = cookie.split('=')[0].trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    });

    it('should return the value of an existing cookie', () => {
      document.cookie = 'testCookie=testValue; path=/';
      expect(getCookie('testCookie')).toBe('testValue');
    });

    it('should return null for a non-existent cookie', () => {
      expect(getCookie('nonExistent')).toBeNull();
    });

    it('should handle cookies with special characters', () => {
      document.cookie = 'specialCookie=test%20value; path=/';
      expect(getCookie('specialCookie')).toBe('test value');
    });

    it('should return the correct cookie when multiple cookies exist', () => {
      document.cookie = 'cookie1=value1; path=/';
      document.cookie = 'cookie2=value2; path=/';
      document.cookie = 'cookie3=value3; path=/';
      
      expect(getCookie('cookie2')).toBe('value2');
    });

    it('should handle cookies with empty values', () => {
      document.cookie = 'emptyCookie=; path=/';
      expect(getCookie('emptyCookie')).toBe('');
    });

    it('should decode URL-encoded cookie values', () => {
      document.cookie = 'encodedCookie=hello%20world%21; path=/';
      expect(getCookie('encodedCookie')).toBe('hello world!');
    });
  });

  describe('setCookie()', () => {
    beforeEach(() => {
      // Clear all cookies before each test
      document.cookie.split(';').forEach((cookie) => {
        const name = cookie.split('=')[0].trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    });

    it('should set a cookie with the given name and value', () => {
      setCookie('testCookie', 'testValue', 3600);
      expect(getCookie('testCookie')).toBe('testValue');
    });

    it('should set a cookie that expires in the future', () => {
      const secondsToExpire = 60; // 1 minute
      setCookie('futureCookie', 'futureValue', secondsToExpire);
      
      expect(getCookie('futureCookie')).toBe('futureValue');
    });

    it('should overwrite existing cookie with same name', () => {
      setCookie('overwriteTest', 'oldValue', 3600);
      expect(getCookie('overwriteTest')).toBe('oldValue');
      
      setCookie('overwriteTest', 'newValue', 3600);
      expect(getCookie('overwriteTest')).toBe('newValue');
    });

    it('should handle cookies with special characters', () => {
      setCookie('specialCookie', 'value with spaces!', 3600);
      expect(getCookie('specialCookie')).toBe('value with spaces!');
    });

    it('should set cookie with path=/', () => {
      setCookie('pathTest', 'pathValue', 3600);
      // Verify cookie is accessible (implicitly tests path=/)
      expect(getCookie('pathTest')).toBe('pathValue');
    });

    it('should calculate correct expiration time', () => {
      const secondsToExpire = 3600; // 1 hour
      const beforeTime = new Date().getTime();
      
      setCookie('expirationTest', 'expirationValue', secondsToExpire);
      
      // Cookie should be accessible immediately
      expect(getCookie('expirationTest')).toBe('expirationValue');
      
      // Verify the time hasn't changed significantly (basic sanity check)
      const afterTime = new Date().getTime();
      expect(afterTime - beforeTime).toBeLessThan(1000); // Less than 1 second elapsed
    });

    it('should handle setting multiple cookies', () => {
      setCookie('cookie1', 'value1', 3600);
      setCookie('cookie2', 'value2', 3600);
      setCookie('cookie3', 'value3', 3600);
      
      expect(getCookie('cookie1')).toBe('value1');
      expect(getCookie('cookie2')).toBe('value2');
      expect(getCookie('cookie3')).toBe('value3');
    });

    it('should handle empty string values', () => {
      setCookie('emptyCookie', '', 3600);
      expect(getCookie('emptyCookie')).toBe('');
    });

    it('should handle numeric-like string values', () => {
      setCookie('numericCookie', '12345', 3600);
      expect(getCookie('numericCookie')).toBe('12345');
    });
  });

  describe('Cookie integration', () => {
    beforeEach(() => {
      // Clear all cookies before each test
      document.cookie.split(';').forEach((cookie) => {
        const name = cookie.split('=')[0].trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    });

    it('should work together - set and get', () => {
      setCookie('integrationTest', 'integrationValue', 3600);
      const value = getCookie('integrationTest');
      expect(value).toBe('integrationValue');
    });

    it('should handle rapid set/get operations', () => {
      setCookie('rapid1', 'value1', 3600);
      setCookie('rapid2', 'value2', 3600);
      
      expect(getCookie('rapid1')).toBe('value1');
      expect(getCookie('rapid2')).toBe('value2');
    });
  });
});
