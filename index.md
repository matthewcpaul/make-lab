---
layout: archive
title: Archive
order: 1
---

<div class="o-block-grid u-mt-lg">
  {% assign archive = site.archive | sort:"order" %}
  {% for archive in site.archive %}
  <div class="o-block-grid__block--full _md-o-block-grid__block--half">
    <ul class="c-pane">
      <li>
        <a class="c-pane__link" href="{{ archive.url }}">
          <img src="/images/{{ archive.thumbnail }}.jpg" alt="">
          <div class="c-pane__overlay">
            <h3 class="f3 f-bold f-background u-mb-xs u-truncate">{{ archive.title }}</h3>
            <div class="u-mb-xxs">
              <span class="f-bold f-background">Size:</span>
              <span class="f-background">{{ archive.width }}" x {{ archive.height }}"</span>
            </div>
            <div class="u-mb-xxs">
              <span class="f-bold f-background">Paper:</span>
              <span class="f-background">{{ archive.paper }}, {{ archive.weight }}</span>
            </div>
            <div class="u-mb-xxs">
              <span class="f-bold f-background">Colors:</span>
              <span class="f-background">{{ archive.colors }}</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  {% endfor %}
</div>
