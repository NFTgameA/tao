const widgetLetsExchange = {
  initWidget(event) {
    if (event.data.event_name === 'openModal') this.showModal(event.data);
    if (event.data.event_name === 'setHeightWidget') this.setHeight(event.data);
    if (event.data.event_name === 'setWidthWidget') this.setWidth(event.data);
    if (event.data.event_name === 'setWidthWidgetButton') this.setWidthButton(event.data);
    if (event.data.event_name === 'setHeightWidgetButton') this.setHeightButton(event.data);
  },
  showModal({ affiliate_id, version, host, height, width }) {
    const div = document.getElementById(`modal-${affiliate_id}`);
    if (div) {
      div.style.display = 'flex';
    } else {
      const div = document.createElement('DIV');
      div.id = `modal-${affiliate_id}`;
      div.className = 'lets-modal-widget';

      const iframe = `<div class="lets-widget" style="max-width: ${width}px; height: ${height}px;" id="lets_widget_${affiliate_id}">
      <iframe
        src="${host}/v2/widget?affiliate_id=${affiliate_id}&is_iframe=true"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="clipboard-read; clipboard-write"
      >
      </iframe>
    </div>`;

      div.innerHTML = iframe;

      const body = document.getElementsByTagName('body')[0];
      body.appendChild(div);

      div.addEventListener('click', () => this.hideModal(affiliate_id));
    }
  },
  hideModal(affiliate_id) {
    const div = document.getElementById(`modal-${affiliate_id}`);
    if (!div) return;
    div.style.display = 'none';
  },
  setHeight({ affiliate_id, height, type }) {
    const widget = document.getElementById(`lets_${type}_${affiliate_id}`);

    if (!widget) return;

    widget.style.height = height + 'px';
  },
  setWidth({ affiliate_id, width, type }) {
    const widget = document.getElementById(`lets_${type}_${affiliate_id}`);

    if (!widget) return;

    widget.style.maxWidth = width + 'px';
  },
  setWidthButton({ affiliate_id, width, type }) {
    const widget = document.getElementById(`${type}-${affiliate_id}`);

    if (widget) {
      widget.style.maxWidth = width + 'px';
    } else {
      const widget = document.querySelector('.lets-button');
      widget.style.maxWidth = width + 'px';
      widget.style.height = 56 + 'px';

      const iframe = document.querySelector('.lets-button iframe');

      iframe.width = '100%';
      iframe.height = '100%';
    }
  },
  setHeightButton({ affiliate_id, height, type }) {
    const widget = document.getElementById(`${type}-${affiliate_id}`);

    if (widget) {
      widget.style.height = height + 'px';
    } else {
      const widget = document.querySelector('.lets-button');

      widget.style.height = height + 'px';

      const iframe = document.querySelector('.lets-button iframe');

      iframe.width = '100%';
      iframe.height = '100%';
    }
  },
};

if (window.addEventListener) {
  window.addEventListener('message', event => widgetLetsExchange.initWidget(event));
} else {
  window.attachEvent('onmessage', event => widgetLetsExchange.initWidget(event));
}
