<li class="log-entry">
  <span class="date">{date}</span>
  <span class={`level ${message.level}`}>{message.level}</span>
  <span>{message.message}</span>
</li>

<style>
  .log-entry {
    display: flex;
    align-items: center;
    gap: 1ch;
  }

  .level {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8ch;
    border-radius: var(--border-radius);
    padding: 0.25rem;
  }

  .level.info {
    background-color: blue;
  }

  .level.warn {
    background-color: orange;
  }

  .level.error {
    background-color: red;
  }

  .date {
    white-space: nowrap;
  }
</style>

<script lang="ts">
  import dayjs from 'dayjs';
  import 'dayjs/locale/de';
  import LocalizedFormat from 'dayjs/plugin/localizedFormat';
  import type { LogEntry } from '../../stores/log/type';

  dayjs.locale('de');
  dayjs.extend(LocalizedFormat);

  type Props = {
    message: LogEntry;
  };

  let { message } = $props<Props>();

  const date = $derived<string>(dayjs(message.timestamp).format('L LTS'));
</script>
