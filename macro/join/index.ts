import jsesc from 'jsesc';
import type { NodePath } from '@babel/traverse';
import type * as Babel from '@babel/core';
import type * as bt from '@babel/types';
import type { PluginOption } from 'vite';

const joinMacroLoader: PluginOption = {
  name: 'join-macro-loader',
  async resolveId(id: string) {
    return id === 'join.macro' ? 'DHZf0KCoMiE-Rpog0CM5b' : null;
  },
  load(id) {
    return id === 'DHZf0KCoMiE-Rpog0CM5b'
      ? "export default function $join(...args) { return args.join(' ') };"
      : null;
  },
};

export { joinMacroLoader };

export default function joinMacro({ types: t }: typeof Babel): Babel.PluginObj {
  return {
    name: 'join-macro',
    visitor: {
      ImportDefaultSpecifier(path) {
        const { parent } = path;
        if (parent.type !== 'ImportDeclaration') {
          throw new Error('Unexpected behavior');
        }

        const { source } = parent;
        if (source.value !== 'join.macro') return;

        const callExpressions = path.scope.bindings[
          path.node.local.name
        ].referencePaths
          .map((path) => path.parentPath)
          .filter(
            (parentPath): parentPath is NodePath<bt.CallExpression> =>
              parentPath !== null && parentPath.isCallExpression(),
          )
          .reverse();

        for (const path of callExpressions) {
          convertCallExpression(t, path);
        }
      },
    },
  };
}

function convertCallExpression(
  t: typeof bt,
  path: NodePath<bt.CallExpression>,
) {
  const tl = makeTemplateLiteral(
    t,
    path.get('arguments') as NodePath<bt.Expression | bt.SpreadElement>[],
  );
  path.replaceWith(tl);

  for (const {
    value: { raw, cooked },
  } of tl.quasis) {
    if (raw !== '' || cooked === '') continue;
  }
}

function makeTemplateLiteral(
  t: typeof bt,
  paths: NodePath<bt.SpreadElement | bt.Expression | null>[],
) {
  const tl = t.templateLiteral(
    [t.templateElement({ raw: '', cooked: '' }, false)],
    [],
  );

  for (const path of paths) {
    const isFirst = path === paths[0];
    if (path.node === null) {
      if (!isFirst) tlAddStr(tl, ' ');
      continue;
    }

    if (path.isSpreadElement()) {
      convertSpreadElement(t, path);
    }

    if (path.isStringLiteral()) {
      if (!isFirst) tlAddStr(tl, ' ');
      tlAddStr(tl, path.node.value);
      continue;
    }

    if (path.isTemplateLiteral()) {
      if (!isFirst) tlAddStr(tl, ' ');
      combineTLs(tl, path.node);
      continue;
    }

    if (!isFirst) tlAddStr(tl, ' ');
    computeRaw(tl.quasis[tl.quasis.length - 1].value);
    tl.expressions.push(path.node as bt.Expression);
    tl.quasis.push(t.templateElement({ raw: '', cooked: '' }, false));
  }

  const lastQ = tl.quasis[tl.quasis.length - 1];
  computeRaw(lastQ.value);
  lastQ.tail = true;
  return tl;
}

function convertSpreadElement(t: typeof bt, path: NodePath<bt.SpreadElement>) {
  const argPath = path.get('argument');
  if (!argPath.isArrayExpression()) {
    path.replaceWith(
      t.callExpression(
        t.memberExpression(
          t.arrayExpression([path.node]),
          t.identifier('join'),
        ),
        [t.stringLiteral(' ')],
      ),
    );
    return path;
  }

  const paths = argPath.get('elements');

  path.replaceWith(makeTemplateLiteral(t, paths));
}

const jsescOptions = { minimal: true, quotes: 'backtick' } as const;
function computeRaw(value: { raw: string; cooked?: string | undefined }) {
  value.raw = jsesc(value.cooked, jsescOptions);
}

function tlAddStr(tl: bt.TemplateLiteral, str: string) {
  tl.quasis[tl.quasis.length - 1].value.cooked += str;
}

function combineTLs(tl0: bt.TemplateLiteral, tl1: bt.TemplateLiteral) {
  tlAddStr(tl0, tl1.quasis[0].value.cooked as string);
  for (let i = 0; i < tl1.expressions.length; i++) {
    const expr = tl1.expressions[i];

    if (expr.type === 'StringLiteral') {
      tlAddStr(tl0, expr.value + tl1.quasis[i + 1].value.cooked);
      continue;
    }

    if (expr.type === 'TemplateLiteral') {
      combineTLs(tl0, expr);
      tlAddStr(tl0, tl1.quasis[i + 1].value.cooked as string);
      continue;
    }

    computeRaw(tl0.quasis[tl0.quasis.length - 1].value);
    tl0.expressions.push(expr);
    tl0.quasis.push(tl1.quasis[i + 1]);
  }

  tl0.quasis[tl0.quasis.length - 1].tail = false;
}
