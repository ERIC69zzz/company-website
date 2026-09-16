import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const navbarSource = readFileSync(
  new URL('../src/components/Navbar.jsx', import.meta.url),
  'utf8',
);

test('桌面端横向展示分类导航，移动端使用可展开菜单', () => {
  assert.match(
    navbarSource,
    /className="hidden lg:flex items-center gap-1"[\s\S]*?\{navItems\.map/,
    '桌面分类导航应从 lg 断点开始横向显示',
  );
  assert.match(
    navbarSource,
    /className="lg:hidden flex items-center gap-1\.5"[\s\S]*?aria-expanded=\{mobileOpen\}[\s\S]*?aria-controls="mobile-navigation"/,
    '移动端应显示带展开状态的菜单按钮',
  );
  assert.match(
    navbarSource,
    /\{mobileOpen && \([\s\S]*?id="mobile-navigation" className="lg:hidden chrome"/,
    '移动导航内容应只在菜单展开时出现，并在桌面端隐藏',
  );
  assert.doesNotMatch(
    navbarSource,
    /hidden xl:flex|xl:hidden/,
    '导航不应回退到仅在更宽的 xl 断点才展示桌面布局',
  );
});
